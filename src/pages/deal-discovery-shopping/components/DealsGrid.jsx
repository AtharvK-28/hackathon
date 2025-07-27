import React from 'react';
import DealCard from './DealCard';
import Icon from '../../../components/AppIcon';

const DealsGrid = ({ deals, onAddToCart, onQuantityChange }) => {
  if (deals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
          <Icon name="Package" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-card-foreground mb-3 text-center">
          No deals found
        </h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          We couldn't find any deals matching your criteria. Try adjusting your filters or search terms.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['Vegetables', 'Fruits', 'Dairy', 'Spices', 'Grains'].map((suggestion) => (
            <span key={suggestion} className="px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer">
              {suggestion}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          deal={deal}
          onAddToCart={onAddToCart}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
};

export default DealsGrid;