import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const OTPInput = ({ value, onChange, error, disabled, onResend, resendTimer }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const inputRefs = useRef([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const labels = {
    en: {
      label: "Enter OTP",
      description: "Enter the 6-digit code sent to your phone",
      resend: "Didn\'t receive code?",
      resendButton: "Resend OTP",
      resendTimer: "Resend in"
    },
    hi: {
      label: "OTP दर्ज करें",
      description: "अपने फोन पर भेजा गया 6 अंकों का कोड दर्ज करें",
      resend: "कोड नहीं मिला?",
      resendButton: "OTP दोबारा भेजें",
      resendTimer: "दोबारा भेजें"
    }
  };

  const handleInputChange = (index, inputValue) => {
    const newValue = inputValue.replace(/\D/g, '');
    if (newValue.length <= 1) {
      const newOTP = value.split('');
      newOTP[index] = newValue;
      onChange(newOTP.join(''));

      // Auto-focus next input
      if (newValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pastedData);
    
    // Focus the last filled input or the next empty one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          {labels[currentLanguage].label}
        </label>
        <div className="flex space-x-3 justify-center">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              value={value[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={disabled}
              className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground ${
                error ? 'border-error' : 'border-border'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              maxLength={1}
            />
          ))}
        </div>
        {!error && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            {labels[currentLanguage].description}
          </p>
        )}
        {error && (
          <p className="text-xs text-error flex items-center justify-center space-x-1 mt-2">
            <Icon name="AlertCircle" size={14} />
            <span>{error}</span>
          </p>
        )}
      </div>

      {/* Resend OTP Section */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          {labels[currentLanguage].resend}
        </p>
        {resendTimer > 0 ? (
          <p className="text-sm text-muted-foreground">
            {labels[currentLanguage].resendTimer} {Math.floor(resendTimer / 60)}:
            {(resendTimer % 60).toString().padStart(2, '0')}
          </p>
        ) : (
          <button
            onClick={onResend}
            disabled={disabled}
            className="text-sm font-medium text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {labels[currentLanguage].resendButton}
          </button>
        )}
      </div>
    </div>
  );
};

export default OTPInput;