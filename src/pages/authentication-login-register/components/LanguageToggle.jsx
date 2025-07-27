import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const languages = {
    en: { label: 'English', flag: '🇺🇸' },
    hi: { label: 'हिंदी', flag: '🇮🇳' }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2"
    >
      <span className="text-lg">{languages[currentLanguage].flag}</span>
      <span className="text-sm font-medium">{languages[currentLanguage].label}</span>
      <Icon name="ChevronDown" size={14} />
    </Button>
  );
};

export default LanguageToggle;