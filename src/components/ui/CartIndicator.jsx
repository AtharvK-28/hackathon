import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useCart } from '../../contexts/CartContext';

const CartIndicator = ({ className = '' }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { cartItems, cartCount, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const cartItemsArray = Object.values(cartItems);

  const handleToggleDropdown = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Cart Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggleDropdown}
        className="relative p-2"
      >
        <Icon name="ShoppingCart" size={20} />
        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {cartCount > 99 ? '99+' : cartCount}
          </div>
        )}
      </Button>

      {/* Cart Preview */}
      {isPreviewOpen && (
        <>
          {/* Mobile Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-90 md:hidden"
            onClick={() => setIsPreviewOpen(false)}
          />
          
          <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-2 z-100 md:w-96">
            {cartItemsArray.length === 0 ? (
              <div className="p-6 text-center">
                <Icon name="ShoppingCart" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Link to="/deal-discovery-shopping">
                  <Button onClick={() => setIsPreviewOpen(false)}>
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-popover-foreground">
                    Cart ({cartCount} items)
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setIsPreviewOpen(false)}>
                    <Icon name="X" size={18} />
                  </Button>
                </div>

                {/* Cart Items */}
                <div className="max-h-64 overflow-y-auto">
                  {cartItemsArray.map((item) => (
                    <div key={item.id} className="p-4 border-b border-border last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          <Icon name="Package" size={20} className="text-muted-foreground" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-popover-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.supplierName}
                          </p>
                          <p className="text-sm font-medium text-primary mt-1">
                            ₹{parseFloat(item.price || 0).toFixed(2)}/{item.unit}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 bg-muted rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, (parseFloat(item.quantity) || 0) - 0.5))}
                              className="p-1 hover:bg-background rounded-l-md transition-colors duration-200"
                            >
                              <Icon name="Minus" size={14} />
                            </button>
                            <span className="px-2 py-1 text-sm font-medium min-w-[40px] text-center">
                              {parseFloat(item.quantity || 0).toFixed(1)}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, (parseFloat(item.quantity) || 0) + 0.5)}
                              className="p-1 hover:bg-background rounded-r-md transition-colors duration-200"
                            >
                              <Icon name="Plus" size={14} />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-error hover:bg-error/10 rounded-md transition-colors duration-200"
                          >
                            <Icon name="Trash2" size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          {parseFloat(item.quantity || 0).toFixed(1)} {item.unit}
                        </span>
                        <span className="text-sm font-semibold text-popover-foreground">
                          ₹{((parseFloat(item.price || 0) * parseFloat(item.quantity || 0)) || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-popover-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">₹{getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Link to="/shopping-cart-checkout" className="block">
                      <Button 
                        className="w-full" 
                        onClick={() => setIsPreviewOpen(false)}
                      >
                        View Cart & Checkout
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsPreviewOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartIndicator;