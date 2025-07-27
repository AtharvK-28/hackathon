import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethodSelector = ({ selectedMethod, onMethodChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when your order arrives',
      icon: 'Banknote',
      recommended: true,
      available: true
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using UPI apps like GPay, PhonePe',
      icon: 'Smartphone',
      recommended: false,
      available: true
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      description: 'Paytm, Amazon Pay, etc.',
      icon: 'Wallet',
      recommended: false,
      available: false
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: 'CreditCard',
      recommended: false,
      available: false
    }
  ];

  const selectedMethodData = paymentMethods.find(method => method.id === selectedMethod);

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
          <Icon name="CreditCard" size={20} className="text-primary" />
          <span>Payment Method</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>

      {/* Selected Method Display */}
      {!isExpanded && selectedMethodData && (
        <div className="flex items-center space-x-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={selectedMethodData.icon} size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-card-foreground">{selectedMethodData.name}</h4>
              {selectedMethodData.recommended && (
                <span className="bg-success/10 text-success text-xs px-2 py-1 rounded-full">
                  Recommended
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{selectedMethodData.description}</p>
          </div>
          <Icon name="Check" size={20} className="text-primary" />
        </div>
      )}

      {/* Payment Methods List */}
      {isExpanded && (
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => method.available && onMethodChange(method.id)}
              disabled={!method.available}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : method.available
                  ? 'border-border hover:border-primary/50 hover:bg-muted/50' :'border-border bg-muted/30 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedMethod === method.id
                  ? 'bg-primary/10' :'bg-muted'
              }`}>
                <Icon 
                  name={method.icon} 
                  size={20} 
                  className={selectedMethod === method.id ? 'text-primary' : 'text-muted-foreground'} 
                />
              </div>
              
              <div className="flex-1 text-left">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-medium ${
                    method.available ? 'text-card-foreground' : 'text-muted-foreground'
                  }`}>
                    {method.name}
                  </h4>
                  {method.recommended && (
                    <span className="bg-success/10 text-success text-xs px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                  {!method.available && (
                    <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className={`text-sm ${
                  method.available ? 'text-muted-foreground' : 'text-muted-foreground/70'
                }`}>
                  {method.description}
                </p>
              </div>

              {selectedMethod === method.id && (
                <Icon name="Check" size={20} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Payment Security Info */}
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={12} />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;