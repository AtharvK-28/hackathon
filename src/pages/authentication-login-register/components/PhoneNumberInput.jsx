import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const PhoneNumberInput = ({ value, onChange, error, disabled }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const labels = {
    en: {
      label: "Phone Number",
      placeholder: "Enter your 10-digit mobile number",
      description: "We'll send you an OTP for verification"
    },
    hi: {
      label: "फोन नंबर",
      placeholder: "अपना 10 अंकों का मोबाइल नंबर दर्ज करें",
      description: "हम आपको सत्यापन के लिए OTP भेजेंगे"
    }
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value.replace(/\D/g, '').slice(0, 10);
    onChange(phoneNumber);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {labels[currentLanguage].label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-muted-foreground">
          <span className="text-lg">🇮🇳</span>
          <span className="text-sm font-medium">+91</span>
          <div className="w-px h-4 bg-border" />
        </div>
        <input
          type="tel"
          value={value}
          onChange={handlePhoneChange}
          placeholder={labels[currentLanguage].placeholder}
          disabled={disabled}
          className={`w-full pl-20 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground text-lg ${
            error ? 'border-error' : 'border-border'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          maxLength={10}
        />
        {value.length === 10 && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
        )}
      </div>
      {!error && (
        <p className="text-xs text-muted-foreground">
          {labels[currentLanguage].description}
        </p>
      )}
      {error && (
        <p className="text-xs text-error flex items-center space-x-1">
          <Icon name="AlertCircle" size={14} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;