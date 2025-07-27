import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import CartIndicator from '../../../components/ui/CartIndicator';

const SearchHeader = ({ onSearch, onFilterClick, searchQuery, onMapToggle, isMapVisible }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  useEffect(() => {
    setLocalSearchQuery(searchQuery || '');
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');
    onSearch('');
  };

  return (
    <div className="sticky top-16 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40">
      <div className="container-responsive">
        <div className="py-4">
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <form onSubmit={handleSubmit} className="relative">
                <div className={`relative flex items-center transition-all duration-200 ${
                  isSearchFocused ? 'ring-2 ring-ring ring-offset-2 ring-offset-background' : ''
                }`}>
                  <div className="absolute left-3 flex items-center pointer-events-none">
                    <Icon 
                      name="Search" 
                      size={18} 
                      className={`transition-colors duration-200 ${
                        isSearchFocused ? 'text-primary' : 'text-muted-foreground'
                      }`} 
                    />
                  </div>
                  
                  <input
                    type="text"
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search for fresh groceries, deals, suppliers..."
                    className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:border-ring transition-all duration-200"
                  />
                  
                  {localSearchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 flex items-center justify-center w-6 h-6 rounded-full bg-muted hover:bg-muted/80 transition-colors duration-200"
                    >
                      <Icon name="X" size={14} className="text-muted-foreground" />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Map Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onMapToggle}
              className={`flex items-center space-x-2 px-4 py-3 transition-all duration-200 ${
                isMapVisible 
                  ? 'bg-primary text-primary-foreground border-primary shadow-elevation-2' 
                  : 'hover:bg-muted hover:border-border/60'
              }`}
            >
              <Icon name="Map" size={18} />
              <span className="hidden sm:inline font-medium">
                {isMapVisible ? 'Hide Map' : 'Show Map'}
              </span>
            </Button>

            {/* Filter Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onFilterClick}
              className="flex items-center space-x-2 px-4 py-3 hover:bg-muted hover:border-border/60 transition-all duration-200"
            >
              <Icon name="Filter" size={18} />
              <span className="hidden sm:inline font-medium">Filters</span>
            </Button>

            {/* Cart Indicator */}
            <div className="hidden md:block">
              <CartIndicator />
            </div>
          </div>

          {/* Quick Search Suggestions */}
          {isSearchFocused && !localSearchQuery && (
            <div className="mt-3 p-3 bg-card border border-border rounded-lg shadow-elevation-2 animate-slide-down">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Popular searches</span>
                <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
              </div>
              <div className="flex flex-wrap gap-2">
                {['Fresh Vegetables', 'Organic Fruits', 'Bulk Rice', 'Dairy Products', 'Spices'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setLocalSearchQuery(suggestion);
                      onSearch(suggestion);
                    }}
                    className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;