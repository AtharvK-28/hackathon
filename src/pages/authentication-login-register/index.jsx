import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LanguageToggle from './components/LanguageToggle';
import PhoneNumberInput from './components/PhoneNumberInput';
import OTPInput from './components/OTPInput';
import UserTypeToggle from './components/UserTypeToggle';
import VendorRegistrationForm from './components/VendorRegistrationForm';
import SupplierRegistrationForm from './components/SupplierRegistrationForm';
import SecurityBadges from './components/SecurityBadges';
import PrivacyMessage from './components/PrivacyMessage';

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [step, setStep] = useState('phone'); // phone, otp, registration
  const [userType, setUserType] = useState('vendor');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);
  const [registrationData, setRegistrationData] = useState({});

  // Mock credentials for demonstration
  const mockCredentials = {
    vendor: {
      phone: '9876543210',
      otp: '123456'
    },
    supplier: {
      phone: '9876543211',
      otp: '654321'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const labels = {
    en: {
      title: "Welcome to Apna Mandi",
      subtitle: "India's Premier Street Food & Grocery Marketplace",
      sendOTP: "Send OTP",
      verifyLogin: "Verify & Login",
      completeRegistration: "Complete Registration",
      resendOTP: "Resend OTP",
      backToPhone: "Back to Phone",
      backToOTP: "Back to OTP"
    },
    hi: {
      title: "अपना मंडी में आपका स्वागत है",
      subtitle: "भारत का प्रमुख स्ट्रीट फूड और किराना बाजार",
      sendOTP: "OTP भेजें",
      verifyLogin: "सत्यापित करें और लॉगिन करें",
      completeRegistration: "पंजीकरण पूरा करें",
      resendOTP: "OTP दोबारा भेजें",
      backToPhone: "फोन पर वापस जाएं",
      backToOTP: "OTP पर वापस जाएं"
    }
  };

  const validatePhone = () => {
    const newErrors = {};
    
    if (!phoneNumber) {
      newErrors.phone = currentLanguage === 'en' ?'Phone number is required' :'फोन नंबर आवश्यक है';
    } else if (phoneNumber.length !== 10) {
      newErrors.phone = currentLanguage === 'en' ?'Phone number must be 10 digits' :'फोन नंबर 10 अंकों का होना चाहिए';
    } else if (phoneNumber !== mockCredentials[userType].phone) {
      newErrors.phone = currentLanguage === 'en' 
        ? `For demo, use ${mockCredentials[userType].phone}` 
        : `डेमो के लिए ${mockCredentials[userType].phone} का उपयोग करें`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    const newErrors = {};
    
    if (!otp) {
      newErrors.otp = currentLanguage === 'en' ?'OTP is required' :'OTP आवश्यक है';
    } else if (otp.length !== 6) {
      newErrors.otp = currentLanguage === 'en' ?'OTP must be 6 digits' :'OTP 6 अंकों का होना चाहिए';
    } else if (otp !== mockCredentials[userType].otp) {
      newErrors.otp = currentLanguage === 'en' 
        ? `For demo, use ${mockCredentials[userType].otp}` 
        : `डेमो के लिए ${mockCredentials[userType].otp} का उपयोग करें`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegistration = () => {
    const newErrors = {};
    
    if (userType === 'vendor') {
      if (!registrationData.stallName) {
        newErrors.stallName = currentLanguage === 'en' ?'Stall name is required' :'स्टॉल का नाम आवश्यक है';
      }
      if (!registrationData.location) {
        newErrors.location = currentLanguage === 'en' ?'Location is required' :'स्थान आवश्यक है';
      }
      if (!registrationData.foodType) {
        newErrors.foodType = currentLanguage === 'en' ?'Food type is required' :'भोजन का प्रकार आवश्यक है';
      }
      if (!registrationData.keyIngredients) {
        newErrors.keyIngredients = currentLanguage === 'en' ?'Key ingredients are required' :'मुख्य सामग्री आवश्यक है';
      }
      if (!registrationData.operatingHours) {
        newErrors.operatingHours = currentLanguage === 'en' ?'Operating hours are required' :'संचालन समय आवश्यक है';
      }
    } else {
      if (!registrationData.businessName) {
        newErrors.businessName = currentLanguage === 'en' ?'Business name is required' :'व्यापार का नाम आवश्यक है';
      }
      if (!registrationData.ownerName) {
        newErrors.ownerName = currentLanguage === 'en' ?'Owner name is required' :'मालिक का नाम आवश्यक है';
      }
      if (!registrationData.businessAddress) {
        newErrors.businessAddress = currentLanguage === 'en' ?'Business address is required' :'व्यापार का पता आवश्यक है';
      }
      if (!registrationData.businessType) {
        newErrors.businessType = currentLanguage === 'en' ?'Business type is required' :'व्यापार का प्रकार आवश्यक है';
      }
      if (!registrationData.fssaiLicense) {
        newErrors.fssaiLicense = currentLanguage === 'en' ?'FSSAI license is required' :'FSSAI लाइसेंस आवश्यक है';
      } else if (registrationData.fssaiLicense.length !== 14) {
        newErrors.fssaiLicense = currentLanguage === 'en' ?'FSSAI license must be 14 digits' :'FSSAI लाइसेंस 14 अंकों का होना चाहिए';
      }
      if (!registrationData.specialization) {
        newErrors.specialization = currentLanguage === 'en' ?'Specialization is required' :'विशेषज्ञता आवश्यक है';
      }
      if (!registrationData.deliveryRadius) {
        newErrors.deliveryRadius = currentLanguage === 'en' ?'Delivery radius is required' :'डिलीवरी रेंज आवश्यक है';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!validatePhone()) return;
    
    setIsLoading(true);
    setErrors({});
    
    // Mock API call
    setTimeout(() => {
      setStep('otp');
      setResendTimer(60);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (!validateOTP()) return;
    
    setIsLoading(true);
    setErrors({});
    
    // Mock API call
    setTimeout(() => {
      setStep('registration');
      setIsLoading(false);
    }, 1500);
  };

  const handleCompleteRegistration = async () => {
    if (!validateRegistration()) return;
    
    setIsLoading(true);
    setErrors({});
    
    // Mock API call
    setTimeout(() => {
      // Store user data in localStorage for demo
      localStorage.setItem('userType', userType);
      localStorage.setItem('userData', JSON.stringify({
        phone: phoneNumber,
        userType,
        ...registrationData
      }));
      
      // Navigate to appropriate dashboard
      if (userType === 'vendor') {
        navigate('/vendor-dashboard');
      } else {
        navigate('/supplier-dashboard');
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleResendOTP = () => {
    setResendTimer(60);
    // Mock resend API call
    setTimeout(() => {
      // Show success message
    }, 1000);
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setPhoneNumber('');
    setOTP('');
    setErrors({});
    setRegistrationData({});
  };

  const getButtonText = () => {
    if (step === 'phone') return labels[currentLanguage].sendOTP;
    if (step === 'otp') return labels[currentLanguage].verifyLogin;
    return labels[currentLanguage].completeRegistration;
  };

  const getButtonAction = () => {
    if (step === 'phone') return handleSendOTP;
    if (step === 'otp') return handleVerifyOTP;
    return handleCompleteRegistration;
  };

  const canProceed = () => {
    if (step === 'phone') return phoneNumber.length === 10;
    if (step === 'otp') return otp.length === 6;
    return true; // Registration validation happens on submit
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Store" size={20} color="white" />
            </div>
            <span className="text-xl font-bold text-foreground">Apna Mandi</span>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {labels[currentLanguage].title}
          </h1>
          <p className="text-muted-foreground">
            {labels[currentLanguage].subtitle}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          {/* User Type Toggle */}
          {step === 'phone' && (
            <div className="mb-6">
              <UserTypeToggle 
                selectedType={userType} 
                onTypeChange={handleUserTypeChange} 
              />
            </div>
          )}

          {/* Phone Input Step */}
          {step === 'phone' && (
            <div className="space-y-6">
              <PhoneNumberInput
                value={phoneNumber}
                onChange={setPhoneNumber}
                error={errors.phone}
                disabled={isLoading}
              />
            </div>
          )}

          {/* OTP Input Step */}
          {step === 'otp' && (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'en' 
                    ? `OTP sent to +91 ${phoneNumber}` 
                    : `+91 ${phoneNumber} पर OTP भेजा गया`
                  }
                </p>
              </div>
              <OTPInput
                value={otp}
                onChange={setOTP}
                error={errors.otp}
                disabled={isLoading}
                onResend={handleResendOTP}
                resendTimer={resendTimer}
              />
            </div>
          )}

          {/* Registration Step */}
          {step === 'registration' && (
            <div className="space-y-6">
              {userType === 'vendor' ? (
                <VendorRegistrationForm
                  formData={registrationData}
                  onChange={setRegistrationData}
                  errors={errors}
                />
              ) : (
                <SupplierRegistrationForm
                  formData={registrationData}
                  onChange={setRegistrationData}
                  errors={errors}
                />
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 mt-6">
            <Button
              onClick={getButtonAction()}
              disabled={!canProceed() || isLoading}
              loading={isLoading}
              className="w-full"
              size="lg"
            >
              {getButtonText()}
            </Button>

            {/* Back Button */}
            {step !== 'phone' && (
              <Button
                variant="outline"
                onClick={() => {
                  if (step === 'otp') {
                    setStep('phone');
                    setOTP('');
                    setErrors({});
                  } else if (step === 'registration') {
                    setStep('otp');
                    setRegistrationData({});
                    setErrors({});
                  }
                }}
                disabled={isLoading}
                className="w-full"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                {step === 'otp' ? labels[currentLanguage].backToPhone : labels[currentLanguage].backToOTP}
              </Button>
            )}
          </div>
        </div>

        {/* Security Badges */}
        <SecurityBadges />

        {/* Privacy Message */}
        <PrivacyMessage />

        {/* Demo Credentials Info */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                {currentLanguage === 'en' ? 'Demo Credentials' : 'डेमो क्रेडेंशियल'}
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <p className="font-medium">
                    {currentLanguage === 'en' ? 'Vendor:' : 'विक्रेता:'}
                  </p>
                  <p className="text-muted-foreground">
                    {currentLanguage === 'en' ? 'Phone:' : 'फोन:'} {mockCredentials.vendor.phone}
                  </p>
                  <p className="text-muted-foreground">OTP: {mockCredentials.vendor.otp}</p>
                </div>
                <div>
                  <p className="font-medium">
                    {currentLanguage === 'en' ? 'Supplier:' : 'आपूर्तिकर्ता:'}
                  </p>
                  <p className="text-muted-foreground">
                    {currentLanguage === 'en' ? 'Phone:' : 'फोन:'} {mockCredentials.supplier.phone}
                  </p>
                  <p className="text-muted-foreground">OTP: {mockCredentials.supplier.otp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue as Guest */}
        <div className="mt-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {currentLanguage === 'en' ? 'or' : 'या'}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/deals')}
            className="mt-4 w-full"
            size="lg"
          >
            <Icon name="Eye" size={16} className="mr-2" />
            {currentLanguage === 'en' ? 'Continue as Guest' : 'अतिथि के रूप में जारी रखें'}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            {currentLanguage === 'en' 
              ? 'Explore the app without creating an account' 
              : 'बिना खाता बनाए ऐप का अन्वेषण करें'
            }
          </p>
        </div>
      </main>
    </div>
  );
};

export default AuthenticationPage;