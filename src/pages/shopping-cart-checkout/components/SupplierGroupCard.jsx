import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import CartItemCard from './CartItemCard';

const SupplierGroupCard = ({ 
  supplier, 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onToggleExpanded,
  isExpanded = true 
}) => {
  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseFloat(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0);
  const deliveryFee = supplier.deliveryFee || 0;
  const minimumOrder = supplier.minimumOrder || 0;
  const isMinimumMet = subtotal >= minimumOrder;
  const total = subtotal + (isMinimumMet ? deliveryFee : 0);
  const itemCount = items.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0);

  return (
    <div className="bg-card border border-border rounded-lg mb-4 overflow-hidden">
      {/* Supplier Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Store" size={20} color="white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-card-foreground">
                  {supplier.name}
                </h3>
                {supplier.isVerified && (
                  <div className="flex items-center space-x-1 bg-success/10 px-2 py-1 rounded-full">
                    <Icon name="CheckCircle" size={12} className="text-success" />
                    <span className="text-xs font-medium text-success">Verified</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="MapPin" size={12} />
                  <span>{supplier.distance}km away</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>{supplier.estimatedDelivery}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Star" size={12} />
                  <span>{supplier.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpanded(supplier.id)}
            className="p-2"
          >
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={20} 
            />
          </Button>
        </div>

        {/* Order Summary */}
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {itemCount.toFixed(1)} items • ₹{subtotal.toFixed(2)}
          </span>
          {!isMinimumMet && (
            <span className="text-warning text-xs">
              ₹{(minimumOrder - subtotal).toFixed(2)} more for free delivery
            </span>
          )}
        </div>
      </div>

      {/* Items List */}
      {isExpanded && (
        <div className="p-4">
          <div className="space-y-3">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </div>

          {/* Delivery Info */}
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm mt-1">
              <div className="flex items-center space-x-1">
                <span className="text-muted-foreground">Delivery Fee</span>
                {!isMinimumMet && (
                  <Icon name="Info" size={12} className="text-warning" />
                )}
              </div>
              <span className={`font-medium ${!isMinimumMet ? 'text-warning' : ''}`}>
                {isMinimumMet ? (deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`) : `₹${deliveryFee}`}
              </span>
            </div>

            {!isMinimumMet && (
              <div className="mt-2 p-2 bg-warning/10 rounded-md">
                <p className="text-xs text-warning">
                  Add ₹{(minimumOrder - subtotal).toFixed(2)} more to qualify for delivery
                </p>
              </div>
            )}

            <div className="border-t border-border mt-2 pt-2 flex items-center justify-between">
              <span className="font-semibold text-card-foreground">Total</span>
              <span className="font-bold text-lg text-primary">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierGroupCard;