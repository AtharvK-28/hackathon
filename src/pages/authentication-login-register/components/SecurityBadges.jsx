import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const badges = {
    en: [
      {
        icon: 'Shield',
        title: 'Secure Login',
        description: 'OTP-based verification'
      },
      {
        icon: 'Lock',
        title: 'Data Protection',
        description: 'Your data is encrypted'
      },
      {
        icon: 'CheckCircle',
        title: 'Verified Platform',
        description: 'Trusted by 10,000+ users'
      }
    ],
    hi: [
      {
        icon: 'Shield',
        title: 'सुरक्षित लॉगिन',
        description: 'OTP-आधारित सत्यापन'
      },
      {
        icon: 'Lock',
        title: 'डेटा सुरक्षा',
        description: 'आपका डेटा एन्क्रिप्टेड है'
      },
      {
        icon: 'CheckCircle',
        title: 'सत्यापित प्लेटफॉर्म',
        description: '10,000+ उपयोगकर्ताओं द्वारा भरोसेमंद'
      }
    ]
  };

  return (
    <div className="bg-muted/30 rounded-lg p-4 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {badges[currentLanguage].map((badge, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name={badge.icon} size={16} className="text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground">{badge.title}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;