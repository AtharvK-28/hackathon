import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ isOpen, onClose, filters, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const dealTypes = [
    { id: 'all', label: 'All Deals', description: 'Show all available deals' },
    { id: 'fresh-morning', label: 'Fresh Morning', description: 'Early morning fresh stock at premium quality' },
    { id: 'end-of-day', label: 'End of Day', description: 'Discounted evening deals to clear stock' },
    { id: 'bulk-discount', label: 'Bulk Discount', description: 'Large quantity orders with special pricing' },
    { id: 'regular', label: 'Regular', description: 'Standard pricing with consistent availability' }
  ];

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...localFilters.priceRange];
    newRange[index] = parseInt(value);
    setLocalFilters({
      ...localFilters,
      priceRange: newRange
    });
  };

  const handleDistanceChange = (distance) => {
    setLocalFilters({
      ...localFilters,
      distance: distance
    });
  };

  const handleDealTypeChange = (dealType) => {
    setLocalFilters({
      ...localFilters,
      dealType: dealType
    });
  };

  const handleVerifiedToggle = () => {
    setLocalFilters({
      ...localFilters,
      verifiedOnly: !localFilters.verifiedOnly
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      categories: [],
      priceRange: [0, 1000],
      distance: 5,
      dealType: 'all',
      verifiedOnly: false
    };
    setLocalFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[99] backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Filter Panel Modal */}
      <div className="fixed left-1/2 top-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 bg-card rounded-xl shadow-elevation-4 w-full max-w-md max-h-[90vh] overflow-y-auto border border-border animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-card-foreground">Filters</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
        {/* Filter Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-140px)]">
          <div className="p-4 space-y-6">
            {/* Price Range */}
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-3">Price Range</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <label className="block text-xs text-muted-foreground mb-1">Min Price</label>
                    <input
                      type="number"
                      value={localFilters.priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-muted-foreground mb-1">Max Price</label>
                    <input
                      type="number"
                      value={localFilters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="1000"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>₹{localFilters.priceRange[0]}</span>
                  <span>₹{localFilters.priceRange[1]}</span>
                </div>
              </div>
            </div>
            {/* Distance */}
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-3">Distance</h4>
              <div className="space-y-2">
                {[1, 2, 3, 5].map((distance) => (
                  <button
                    key={distance}
                    onClick={() => handleDistanceChange(distance)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                      localFilters.distance === distance
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-border/80 text-card-foreground'
                    }`}
                  >
                    <span className="text-sm">Within {distance}km</span>
                    {localFilters.distance === distance && (
                      <Icon name="Check" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Deal Type */}
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-3">Deal Type</h4>
              <div className="space-y-2">
                {dealTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleDealTypeChange(type.id)}
                    className={`w-full flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                      localFilters.dealType === type.id
                        ? 'border-primary bg-primary/5' :'border-border hover:border-border/80'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                      localFilters.dealType === type.id
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {localFilters.dealType === type.id && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-card-foreground">{type.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {/* Verified Suppliers */}
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-3">Supplier Verification</h4>
              <button
                onClick={handleVerifiedToggle}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                  localFilters.verifiedOnly
                    ? 'border-primary bg-primary/5' :'border-border hover:border-border/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="BadgeCheck" size={20} className="text-primary" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-card-foreground">Verified Suppliers Only</p>
                    <p className="text-xs text-muted-foreground">Show only FSSAI verified suppliers</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  localFilters.verifiedOnly
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {localFilters.verifiedOnly && (
                    <Icon name="Check" size={12} color="white" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Reset
            </Button>
            <Button onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;