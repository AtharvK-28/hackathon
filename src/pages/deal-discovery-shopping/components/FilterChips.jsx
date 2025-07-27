import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ categories, selectedCategories, onCategoryToggle, onDealTypeChange, onClearAll, dealType }) => {
  const dealTypes = [
    { id: 'all', name: 'All Deals', icon: 'Grid3X3', color: 'text-muted-foreground' },
    { id: 'fresh-morning', name: 'Fresh Morning', icon: 'Sunrise', color: 'text-success' },
    { id: 'end-of-day', name: 'End of Day', icon: 'Clock', color: 'text-warning' },
    { id: 'bulk-discount', name: 'Bulk Discount', icon: 'Package', color: 'text-primary' },
    { id: 'regular', name: 'Regular', icon: 'Tag', color: 'text-muted-foreground' }
  ];

  const hasActiveFilters = selectedCategories.length > 0 || dealType !== 'all';

  return (
    <div className="space-y-4">
      {/* Deal Type Filter */}
      <div>
        <h3 className="text-sm font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="Tag" size={16} className="mr-2" />
          Deal Types
        </h3>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {dealTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onDealTypeChange(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                dealType === type.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-card-foreground hover:border-border/60'
              }`}
            >
              <Icon name={type.icon} size={16} className={type.color} />
              <span>{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="Grid3X3" size={16} className="mr-2" />
          Categories
        </h3>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryToggle(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                selectedCategories.includes(category.id)
                  ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-card-foreground hover:border-border/60'
              }`}
            >
              <Icon name={category.icon} size={16} />
              <span>{category.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategories.includes(category.id)
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-card-foreground"
          >
            <Icon name="X" size={14} className="mr-2" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterChips;