import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItemCard = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (newQuantity) => {
    const quantity = parseFloat(newQuantity) || 0;
    if (quantity <= 0) {
      onRemoveItem(item.id);
    } else {
      onUpdateQuantity(item.id, quantity);
    }
  };

  const price = parseFloat(item.price) || 0;
  const quantity = parseFloat(item.quantity) || 0;
  const originalPrice = parseFloat(item.originalPrice) || 0;
  const subtotal = price * quantity;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-3">
      <div className="flex items-start space-x-3">
        {/* Product Image */}
        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-card-foreground truncate">
                {item.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {item.category}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm font-semibold text-primary">
                  ₹{price.toFixed(2)}/{item.unit}
                </span>
                {originalPrice > price && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveItem(item.id)}
              className="p-1 text-error hover:bg-error/10"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>

          {/* Quantity Controls and Subtotal */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-muted rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - (item.unit === 'kg' ? 0.5 : 1))}
                  className="p-2 hover:bg-background rounded-l-lg"
                >
                  <Icon name="Minus" size={14} />
                </Button>
                <span className="px-3 py-2 text-sm font-medium min-w-[50px] text-center">
                  {quantity.toFixed(1)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + (item.unit === 'kg' ? 0.5 : 1))}
                  className="p-2 hover:bg-background rounded-r-lg"
                >
                  <Icon name="Plus" size={14} />
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">
                {item.unit}
              </span>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-card-foreground">
                ₹{subtotal.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Deal Badge */}
          {item.dealType && (
            <div className="mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                item.dealType === 'end-of-day' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
              }`}>
                <Icon 
                  name={item.dealType === 'end-of-day' ? 'Clock' : 'Sunrise'} 
                  size={12} 
                  className="mr-1" 
                />
                {item.dealType === 'end-of-day' ? 'End of Day Deal' : 'Fresh Morning Deal'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;