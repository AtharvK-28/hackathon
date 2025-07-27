import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddressConfirmation = ({ address, onAddressUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState(address);

  const handleSave = () => {
    onAddressUpdate(editedAddress);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAddress(address);
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <span>Delivery Address</span>
        </h3>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-primary"
          >
            <Icon name="Edit" size={16} className="mr-1" />
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <Input
            label="Stall Name"
            type="text"
            value={editedAddress.stallName}
            onChange={(e) => setEditedAddress(prev => ({ ...prev, stallName: e.target.value }))}
            placeholder="Enter your stall name"
          />
          
          <Input
            label="Street Address"
            type="text"
            value={editedAddress.street}
            onChange={(e) => setEditedAddress(prev => ({ ...prev, street: e.target.value }))}
            placeholder="Enter street address"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Area"
              type="text"
              value={editedAddress.area}
              onChange={(e) => setEditedAddress(prev => ({ ...prev, area: e.target.value }))}
              placeholder="Area/Locality"
            />
            <Input
              label="Pincode"
              type="text"
              value={editedAddress.pincode}
              onChange={(e) => setEditedAddress(prev => ({ ...prev, pincode: e.target.value }))}
              placeholder="Pincode"
            />
          </div>
          
          <Input
            label="Delivery Instructions"
            type="text"
            value={editedAddress.instructions}
            onChange={(e) => setEditedAddress(prev => ({ ...prev, instructions: e.target.value }))}
            placeholder="Any specific instructions for delivery"
          />

          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Address
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Store" size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-card-foreground">{address.stallName}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {address.street}, {address.area}
              </p>
              <p className="text-sm text-muted-foreground">
                {address.city}, {address.pincode}
              </p>
              {address.instructions && (
                <div className="mt-2 p-2 bg-muted/30 rounded-md">
                  <p className="text-xs text-muted-foreground">
                    <Icon name="Info" size={12} className="inline mr-1" />
                    {address.instructions}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-muted-foreground pt-2 border-t border-border">
            <div className="flex items-center space-x-1">
              <Icon name="Navigation" size={12} />
              <span>Current Location</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>Available for delivery</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressConfirmation;