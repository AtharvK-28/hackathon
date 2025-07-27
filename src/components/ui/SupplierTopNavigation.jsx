import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SupplierTopNavigation = () => {
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notificationCount = 5; // Example notification count
  const businessName = "Fresh Produce Co.";
  const userName = "Rajesh Kumar";

  const notifications = [
    { id: 1, title: 'New Order Received', message: 'Order #1234 from Vendor ABC', time: '2 min ago', type: 'order' },
    { id: 2, title: 'Low Stock Alert', message: 'Tomatoes running low (5kg left)', time: '15 min ago', type: 'warning' },
    { id: 3, title: 'Payment Received', message: '₹2,500 payment confirmed', time: '1 hour ago', type: 'success' },
  ];

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-90 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Business Name */}
          <div className="flex items-center space-x-4">
            <Link to="/supplier-dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Store" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-foreground">Apna Mandi</span>
            </Link>
            
            <div className="hidden md:block h-6 w-px bg-border" />
            
            <div className="hidden md:block">
              <span className="text-sm font-medium text-foreground">{businessName}</span>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="MapPin" size={12} />
                <span>Borivali, Mumbai</span>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Quick Actions */}
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Icon name="Plus" size={16} />
              <span>Add Product</span>
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleNotifications}
                className="relative p-2"
              >
                <Icon name="Bell" size={20} />
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </div>
                )}
              </Button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-2 z-100">
                  <div className="p-4 border-b border-border">
                    <h3 className="text-sm font-semibold text-popover-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted transition-colors duration-200">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'order' ? 'bg-primary' :
                            notification.type === 'warning'? 'bg-warning' : 'bg-success'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-popover-foreground">{notification.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={toggleProfile}
                className="flex items-center space-x-2 p-2"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 z-100">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-popover-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground">{businessName}</p>
                  </div>
                  <div className="py-1">
                    <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200">
                      <Icon name="User" size={16} />
                      <span>Profile Settings</span>
                    </button>
                    <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200">
                      <Icon name="Settings" size={16} />
                      <span>Business Settings</span>
                    </button>
                    <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200">
                      <Icon name="HelpCircle" size={16} />
                      <span>Help & Support</span>
                    </button>
                    <div className="border-t border-border mt-1 pt-1">
                      <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-error hover:bg-muted transition-colors duration-200">
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="md:hidden p-2"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-4 py-3 space-y-3">
              <div className="pb-3 border-b border-border">
                <p className="text-sm font-medium text-foreground">{businessName}</p>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                  <Icon name="MapPin" size={12} />
                  <span>Borivali, Mumbai</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Icon name="Plus" size={16} className="mr-2" />
                Add Product
              </Button>
              
              <button 
                onClick={toggleNotifications}
                className="flex items-center justify-between w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Bell" size={16} />
                  <span>Notifications</span>
                </div>
                {notificationCount > 0 && (
                  <div className="bg-secondary text-secondary-foreground text-xs font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {notificationCount}
                  </div>
                )}
              </button>
              
              <div className="border-t border-border pt-3">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground">Supplier Account</p>
                  </div>
                </div>
                
                <div className="space-y-1 mt-2">
                  <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-200">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-200">
                    <Icon name="Settings" size={16} />
                    <span>Business Settings</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-error hover:bg-muted rounded-md transition-colors duration-200">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {(isMobileMenuOpen || isNotificationOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-80 md:hidden"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default SupplierTopNavigation;