import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ suppliers, isVisible, onToggle, userLocation }) => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Mock map center coordinates (Sector 14, Gurgaon)
  const mapCenter = userLocation || { lat: 28.4595, lng: 77.0266 };

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-20 right-4 z-80 md:bottom-4">
        <Button
          onClick={onToggle}
          className="rounded-full w-12 h-12 shadow-elevation-2"
        >
          <Icon name="Map" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-90 bg-card md:relative md:inset-auto md:h-full">
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <h3 className="text-lg font-semibold text-card-foreground">Nearby Suppliers</h3>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      {/* Map Container */}
      <div className="relative h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Suppliers Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=14&output=embed`}
          className="border-0"
        />

        {/* Supplier Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {suppliers.map((supplier, index) => (
            <div
              key={supplier.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${20 + (index % 3) * 30}%`,
                top: `${30 + (index % 2) * 40}%`
              }}
            >
              <button
                onClick={() => handleSupplierClick(supplier)}
                className={`w-8 h-8 rounded-full border-2 border-white shadow-elevation-1 flex items-center justify-center transition-all duration-200 ${
                  selectedSupplier?.id === supplier.id
                    ? 'bg-primary scale-125' :'bg-secondary hover:scale-110'
                }`}
              >
                <Icon 
                  name="Store" 
                  size={16} 
                  color="white"
                />
              </button>
            </div>
          ))}
        </div>

        {/* Selected Supplier Info */}
        {selectedSupplier && (
          <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg shadow-elevation-2 p-4">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Store" size={20} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-card-foreground text-sm">
                    {selectedSupplier.name}
                  </h4>
                  {selectedSupplier.isVerified && (
                    <Icon name="BadgeCheck" size={16} className="text-primary" />
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span className="text-xs text-muted-foreground">
                      {selectedSupplier.rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {selectedSupplier.distance}km away
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {selectedSupplier.specialties?.join(', ')}
                </p>
              </div>
              <button
                onClick={() => setSelectedSupplier(null)}
                className="p-1 hover:bg-muted rounded-full transition-colors duration-200"
              >
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-card border border-border rounded-lg shadow-elevation-1 p-3">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary rounded-full" />
              <span className="text-xs text-card-foreground">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-secondary rounded-full" />
              <span className="text-xs text-card-foreground">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Navigation" size={16} className="text-primary" />
              <span className="text-xs text-card-foreground">Your Location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;