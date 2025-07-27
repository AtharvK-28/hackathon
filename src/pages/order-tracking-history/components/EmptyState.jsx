import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type, searchQuery, hasFilters, onClearFilters }) => {
  const getEmptyStateContent = () => {
    if (searchQuery || hasFilters) {
      return {
        icon: 'Search',
        title: 'No orders found',
        description: searchQuery 
          ? `No orders match "${searchQuery}"`
          : 'No orders match your current filters',
        actionText: 'Clear filters',
        actionIcon: 'X',
        onAction: onClearFilters
      };
    }

    switch (type) {
      case 'active':
        return {
          icon: 'Clock',
          title: 'No active orders',
          description: 'You don\'t have any pending or ongoing orders at the moment.',
          actionText: 'Browse Deals',
          actionIcon: 'ShoppingBag',
          actionLink: '/deal-discovery-shopping'
        };
      case 'history':
        return {
          icon: 'History',
          title: 'No order history',
          description: 'Your completed and cancelled orders will appear here.',
          actionText: 'Start Shopping',
          actionIcon: 'ShoppingCart',
          actionLink: '/deal-discovery-shopping'
        };
      default:
        return {
          icon: 'Package',
          title: 'No orders yet',
          description: 'Start ordering fresh ingredients from local suppliers.',
          actionText: 'Explore Deals',
          actionIcon: 'Search',
          actionLink: '/deal-discovery-shopping'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name={content.icon} size={40} className="text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold text-card-foreground mb-2">
        {content.title}
      </h3>
      
      <p className="text-muted-foreground mb-8 max-w-sm">
        {content.description}
      </p>

      {content.actionLink ? (
        <Link to={content.actionLink}>
          <Button variant="default" className="flex items-center space-x-2">
            <Icon name={content.actionIcon} size={18} />
            <span>{content.actionText}</span>
          </Button>
        </Link>
      ) : (
        <Button 
          variant="outline" 
          onClick={content.onAction}
          className="flex items-center space-x-2"
        >
          <Icon name={content.actionIcon} size={18} />
          <span>{content.actionText}</span>
        </Button>
      )}

      {/* Additional Quick Actions */}
      {type === 'active' && (
        <div className="mt-8 space-y-3 w-full max-w-xs">
          <p className="text-sm text-muted-foreground">Quick actions:</p>
          <div className="space-y-2">
            <Link to="/shopping-cart-checkout" className="block">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Check Cart
              </Button>
            </Link>
            <Link to="/vendor-dashboard" className="block">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Icon name="LayoutDashboard" size={16} className="mr-2" />
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;