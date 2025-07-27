import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DealCard = ({ deal, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (quantity <= 0) return;
    
    setIsAdding(true);
    try {
      await onAddToCart(deal, quantity);
      setQuantity(0);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => {
    if (quantity < deal.availableQuantity) {
      setQuantity(prev => prev + 0.5);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(prev => Math.max(0, prev - 0.5));
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      {/* Product Image */}
      <div className="relative h-40 overflow-hidden">
        <Image 
          src={deal.image} 
          alt={deal.name}
          className="w-full h-full object-cover"
        />
        {deal.dealType === 'end-of-day' && (
          <div className="absolute top-2 left-2 bg-warning text-warning-foreground px-2 py-1 rounded-md text-xs font-medium">
            End of Day
          </div>
        )}
        {deal.dealType === 'next-morning-fresh' && (
          <div className="absolute top-2 left-2 bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium">
            Fresh Tomorrow
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
          {deal.distance}km
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground text-sm">{deal.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-xs text-muted-foreground">{deal.supplierName}</p>
              {deal.isVerified && (
                <Icon name="BadgeCheck" size={14} className="text-primary" />
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">₹{deal.price}</p>
            <p className="text-xs text-muted-foreground">per {deal.unit}</p>
          </div>
        </div>

        {/* Rating and Stock */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="text-xs text-muted-foreground">{deal.rating}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {deal.availableQuantity}{deal.unit} available
          </p>
        </div>

        {/* Quantity Selector and Add Button */}
        <div className="flex items-center space-x-2">
          {quantity === 0 ? (
            <Button 
              onClick={() => setQuantity(0.5)}
              variant="outline" 
              className="flex-1"
              size="sm"
            >
              <Icon name="Plus" size={16} className="mr-1" />
              Add
            </Button>
          ) : (
            <>
              <div className="flex items-center space-x-1 bg-muted rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="p-2 hover:bg-background rounded-l-md transition-colors duration-200"
                >
                  <Icon name="Minus" size={14} />
                </button>
                <span className="px-3 py-2 text-sm font-medium min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="p-2 hover:bg-background rounded-r-md transition-colors duration-200"
                  disabled={quantity >= deal.availableQuantity}
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>
              <Button 
                onClick={handleAddToCart}
                loading={isAdding}
                className="flex-1"
                size="sm"
              >
                Add ₹{(quantity * deal.price).toFixed(2)}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealCard;