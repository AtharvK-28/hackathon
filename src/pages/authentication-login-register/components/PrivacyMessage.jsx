import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyMessage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const messages = {
    en: {
      title: "Your Privacy Matters",
      description: "We use your phone number only for authentication and order updates. We never share your personal information with third parties.",
      links: {
        privacy: "Privacy Policy",
        terms: "Terms of Service"
      }
    },
    hi: {
      title: "आपकी गोपनीयता महत्वपूर्ण है",
      description: "हम आपके फोन नंबर का उपयोग केवल प्रमाणीकरण और ऑर्डर अपडेट के लिए करते हैं। हम आपकी व्यक्तिगत जानकारी को तीसरे पक्ष के साथ साझा नहीं करते हैं।",
      links: {
        privacy: "गोपनीयता नीति",
        terms: "सेवा की शर्तें"
      }
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mt-6">
      <div className="flex items-start space-x-3">
        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon name="Info" size={14} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground mb-2">
            {messages[currentLanguage].title}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            {messages[currentLanguage].description}
          </p>
          <div className="flex space-x-4">
            <button className="text-xs text-primary hover:text-primary/80 font-medium">
              {messages[currentLanguage].links.privacy}
            </button>
            <button className="text-xs text-primary hover:text-primary/80 font-medium">
              {messages[currentLanguage].links.terms}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyMessage;