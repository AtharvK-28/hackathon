import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationBanner = ({ onLocationChange }) => {
  const [currentLocation, setCurrentLocation] = useState('Detecting location...');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock location detection
    const timer = setTimeout(() => {
      setCurrentLocation('Borivali, Mumbai');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLocationSave = () => {
    if (searchQuery.trim()) {
      setCurrentLocation(searchQuery);
      if (onLocationChange) {
        onLocationChange(searchQuery);
      }
      setSearchQuery('');
    }
    setIsLocationModalOpen(false);
  };

  const detectCurrentLocation = () => {
    setCurrentLocation('Detecting location...');
    setTimeout(() => {
      const newLocation = 'Borivali, Mumbai'; // Mock detected location
      setCurrentLocation(newLocation);
      if (onLocationChange) {
        onLocationChange(newLocation);
      }
      setIsLocationModalOpen(false);
    }, 2000);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="MapPin" size={20} color="white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Delivering to</p>
              <p className="font-medium text-card-foreground">{currentLocation}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsLocationModalOpen(true)}
          >
            <Icon name="Edit" size={14} className="mr-1" />
            Change
          </Button>
        </div>
      </div>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">Update Location</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsLocationModalOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={detectCurrentLocation}
                className="w-full justify-start mb-4"
                disabled={currentLocation === 'Detecting location...'}
              >
                <Icon name="Navigation" size={18} className="mr-2" />
                <span>Use Current Location</span>
                {currentLocation === 'Detecting location...' && (
                  <Icon name="Loader2" size={16} className="ml-auto animate-spin" />
                )}
              </Button>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Search for area, street name...
                  </label>
                  <div className="relative">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter your location"
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground"
                      onKeyPress={(e) => e.key === 'Enter' && handleLocationSave()}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-card-foreground mb-2">Popular Locations</p>
                  <div className="space-y-2">
                    {['Borivali, Mumbai', 'Andheri, Mumbai', 'Kandivali, Mumbai', 'Powai, Mumbai'].map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setCurrentLocation(location);
                          if (onLocationChange) {
                            onLocationChange(location);
                          }
                          setIsLocationModalOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full p-2 text-left hover:bg-muted rounded-md transition-colors duration-200"
                      >
                        <Icon name="MapPin" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-card-foreground">{location}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setIsLocationModalOpen(false)} 
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleLocationSave} 
                  className="flex-1"
                  disabled={!searchQuery.trim()}
                >
                  Save Location
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationBanner;