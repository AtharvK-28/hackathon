import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import './AnimatedOrderButton.css'; // Import the new CSS file

const AnimatedOrderButton = ({ 
  onComplete, 
  defaultText, 
  successText = "Order Placed!", 
  disabled = false, 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentText, setCurrentText] = useState(defaultText);
  const buttonRef = useRef(null);
  const animationRef = useRef(null);

  // Update currentText when defaultText prop changes
  useEffect(() => {
    if (!isAnimating && !isComplete) {
      setCurrentText(defaultText);
    }
  }, [defaultText, isAnimating, isComplete]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const handleClick = async () => {
    if (disabled || isAnimating || isComplete) return;

    setIsAnimating(true);
    setCurrentText("Processing...");

    try {
      // Simulate processing time
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 2000);
      });

      // Animation complete
      setIsComplete(true);
      setCurrentText(successText);

      // Call the completion callback
      if (onComplete) {
        onComplete();
      }

      // Reset after a delay
      setTimeout(() => {
        setIsAnimating(false);
        setIsComplete(false);
        setCurrentText(defaultText);
      }, 3000);

    } catch (error) {
      console.error('Animation error:', error);
      // Reset on error
      setIsAnimating(false);
      setCurrentText(defaultText);
    }
  };

  const getButtonContent = () => {
    if (isComplete) {
      return (
        <>
          <div className="truck-animation">
            <Icon name="Truck" size={20} className="mr-2 animate-bounce" />
          </div>
          {currentText}
        </>
      );
    }

    if (isAnimating) {
      return (
        <>
          <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
          {currentText}
        </>
      );
    }

    return (
      <>
        <Icon name="ShoppingCart" size={20} className="mr-2" />
        {currentText}
      </>
    );
  };

  const getButtonClasses = () => {
    let baseClasses = "w-full h-12 text-lg font-semibold transition-all duration-300 transform animated-order-button";
    
    if (isComplete) {
      baseClasses += " bg-success text-success-foreground scale-105 success";
    } else if (isAnimating) {
      baseClasses += " bg-primary text-primary-foreground loading";
    } else {
      baseClasses += " bg-primary text-primary-foreground hover:bg-primary/90";
    }

    if (className) {
      baseClasses += ` ${className}`;
    }

    return baseClasses;
  };

  return (
    <Button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled || isAnimating || isComplete}
      className={getButtonClasses()}
    >
      {getButtonContent()}
    </Button>
  );
};

export default AnimatedOrderButton; 