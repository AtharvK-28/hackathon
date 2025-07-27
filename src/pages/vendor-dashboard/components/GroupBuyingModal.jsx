import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GroupBuyingModal = ({ isOpen, onClose, onCreateGroup }) => {
  const [groupData, setGroupData] = useState({
    productName: '',
    targetQuantity: '',
    maxPrice: '',
    description: '',
    duration: '24'
  });
  const [isCreating, setIsCreating] = useState(false);

  const nearbyVendors = [
    { id: 1, name: 'Raj\'s Chaat Corner', distance: '0.2km', avatar: 'RC' },
    { id: 2, name: 'Mumbai Street Food', distance: '0.5km', avatar: 'MS' },
    { id: 3, name: 'Delhi Delights', distance: '0.8km', avatar: 'DD' },
    { id: 4, name: 'Spice Junction', distance: '1.2km', avatar: 'SJ' }
  ];

  const handleInputChange = (field, value) => {
    setGroupData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateGroup = async () => {
    setIsCreating(true);
    try {
      await onCreateGroup(groupData);
      setGroupData({
        productName: '',
        targetQuantity: '',
        maxPrice: '',
        description: '',
        duration: '24'
      });
      onClose();
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-card-foreground">Create Group Buy</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-4">
            {/* Product Details */}
            <div>
              <Input
                label="Product Name"
                type="text"
                placeholder="e.g., Fresh Tomatoes"
                value={groupData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Target Quantity"
                type="number"
                placeholder="e.g., 10"
                value={groupData.targetQuantity}
                onChange={(e) => handleInputChange('targetQuantity', e.target.value)}
                required
              />
              <Input
                label="Max Price (₹/kg)"
                type="number"
                placeholder="e.g., 25"
                value={groupData.maxPrice}
                onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                required
              />
            </div>

            <div>
              <Input
                label="Description"
                type="text"
                placeholder="Any specific requirements..."
                value={groupData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['12', '24', '48'].map((hours) => (
                  <button
                    key={hours}
                    onClick={() => handleInputChange('duration', hours)}
                    className={`p-2 text-sm rounded-md border transition-colors duration-200 ${
                      groupData.duration === hours
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                    }`}
                  >
                    {hours}h
                  </button>
                ))}
              </div>
            </div>

            {/* Nearby Vendors */}
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-3">
                Nearby Vendors ({nearbyVendors.length})
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {nearbyVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center space-x-3 p-2 bg-muted rounded-md">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {vendor.avatar}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">{vendor.name}</p>
                      <p className="text-xs text-muted-foreground">{vendor.distance} away</p>
                    </div>
                    <Icon name="Users" size={14} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-primary/5 rounded-lg p-3">
              <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                <Icon name="TrendingDown" size={16} className="mr-1" />
                Group Buying Benefits
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Better prices through bulk ordering</li>
                <li>• Shared delivery costs</li>
                <li>• Guaranteed minimum quantity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleCreateGroup}
              loading={isCreating}
              className="flex-1"
              disabled={!groupData.productName || !groupData.targetQuantity || !groupData.maxPrice}
            >
              Create Group
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupBuyingModal;