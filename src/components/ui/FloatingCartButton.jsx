import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

const FloatingCartButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { cartCount, getCartTotal } = useCart();

  // Don't render if no items in cart
  if (cartCount === 0) return null;

  const totalPrice = getCartTotal();

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Tooltip */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          background: '#1f2937',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1001
        }}>
          Total: ₹{totalPrice.toFixed(2)}
          {/* Arrow pointing down */}
          <div style={{
            position: 'absolute',
            top: '100%',
            right: '20px',
            width: '0',
            height: '0',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid #1f2937'
          }}></div>
        </div>
      )}

      {/* Main Cart Button */}
      <div 
        style={{
          width: '60px',
          height: '60px',
          background: '#3b82f6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 6px 25px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          fontSize: '24px',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
        onClick={() => window.location.href = '/shopping-cart-checkout'}
      >
        🛒
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
          }}>
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default FloatingCartButton; 