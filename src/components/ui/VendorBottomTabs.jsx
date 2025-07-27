import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import { useCart } from '../../contexts/CartContext';

const VendorBottomTabs = () => {
  const location = useLocation();
  const { cartCount } = useCart();

  const tabs = [
    { 
      label: 'Dashboard', 
      path: '/vendor-dashboard', 
      icon: 'LayoutDashboard',
      activeIcon: 'LayoutDashboard'
    },
    { 
      label: 'Deals', 
      path: '/deal-discovery-shopping', 
      icon: 'ShoppingBag',
      activeIcon: 'ShoppingBag'
    },
    { 
      label: 'Cart', 
      path: '/shopping-cart-checkout', 
      icon: 'ShoppingCart',
      activeIcon: 'ShoppingCart',
      badge: cartCount
    },
    { 
      label: 'Orders', 
      path: '/order-tracking-history', 
      icon: 'Package',
      activeIcon: 'Package'
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-50 safe-area-pb shadow-elevation-2">
      <div className="flex items-center justify-around h-20 px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 px-3 py-2 transition-all duration-300 ease-out rounded-xl mx-1 ${
                active 
                  ? 'text-primary bg-primary/10 scale-105' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="relative">
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  active ? 'bg-primary/20 scale-110' : 'hover:bg-muted/50'
                }`}>
                  <Icon 
                    name={active ? tab.activeIcon : tab.icon} 
                    size={24} 
                    strokeWidth={active ? 2.5 : 2}
                    className={active ? 'text-primary' : 'text-muted-foreground'}
                  />
                </div>
                
                {/* Badge for cart count */}
                {tab.badge && tab.badge > 0 && (
                  <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 shadow-sm">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </div>
                )}
              </div>
              
              <span className={`text-xs font-semibold mt-1 transition-all duration-300 ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default VendorBottomTabs;