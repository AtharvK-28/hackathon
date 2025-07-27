import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';
import NotificationCenter from './NotificationCenter';
import AccountMenu from './AccountMenu';

const Header = () => {
  const { isDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/deals" className="flex items-center space-x-2">
            <div className="relative">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elevation-2">
                <Icon name="ShoppingBag" size={20} className="text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-success rounded-full border-2 border-background animate-pulse-gentle"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">Apna Mandi</h1>
              <p className="text-xs text-muted-foreground">Fresh Groceries Delivered</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/deals" 
              className="nav-link group relative"
            >
              <span className="flex items-center space-x-1">
                <Icon name="Tag" size={16} className="group-hover:text-primary transition-colors" />
                <span>Deals</span>
              </span>
            </Link>
            <Link 
              to="/vendor-exchange" 
              className="nav-link group relative"
            >
              <span className="flex items-center space-x-1">
                <Icon name="RefreshCw" size={16} className="group-hover:text-primary transition-colors" />
                <span>Vendor Exchange</span>
              </span>
            </Link>
            <Link 
              to="/virasaat" 
              className="nav-link group relative"
            >
              <span className="flex items-center space-x-1">
                <Icon name="Crown" size={16} className="group-hover:text-primary transition-colors" />
                <span>Virasaat</span>
              </span>
            </Link>
            <Link 
              to="/karigar-connect" 
              className="nav-link group relative"
            >
              <span className="flex items-center space-x-1">
                <Icon name="Wrench" size={16} className="group-hover:text-primary transition-colors" />
                <span>Karigar Connect</span>
              </span>
            </Link>
              <Link
              to="/cart" 
              className="nav-link group relative"
            >
              <span className="flex items-center space-x-1">
                <Icon name="ShoppingCart" size={16} className="group-hover:text-primary transition-colors" />
                <span>Cart</span>
              </span>
              </Link>
            <Link 
              to="/orders" 
              className="nav-link group relative"
            >
              <span className="flex items-center space-x-1">
                <Icon name="Package" size={16} className="group-hover:text-primary transition-colors" />
                <span>Orders</span>
              </span>
            </Link>
                      <Link
              to="/dashboard" 
              className="nav-link group relative"
            >
              <span className="flex items-center space-x-1">
                <Icon name="BarChart3" size={16} className="group-hover:text-primary transition-colors" />
                <span>Dashboard</span>
              </span>
                      </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle className="hidden sm:flex" />
            
            {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
              aria-label="Toggle menu"
          >
              <Icon name="Menu" size={20} />
          </Button>

            {/* Notification Center */}
            <NotificationCenter className="hidden sm:flex" />

            {/* Account Menu */}
            <AccountMenu className="hidden sm:flex" />
          </div>
        </div>
        </div>

      {/* Mobile navigation overlay */}
      <div className="md:hidden">
        <div className="border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container-responsive py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link to="/deals" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <Icon name="Tag" size={16} />
                  <span className="text-sm">Deals</span>
                </Link>
                <Link to="/vendor-exchange" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <Icon name="RefreshCw" size={16} />
                  <span className="text-sm">Exchange</span>
                </Link>
                <Link to="/virasaat" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <Icon name="Crown" size={16} />
                  <span className="text-sm">Virasaat</span>
                </Link>
                <Link to="/karigar-connect" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <Icon name="Wrench" size={16} />
                  <span className="text-sm">Karigar</span>
                </Link>
                <Link to="/cart" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <Icon name="ShoppingCart" size={16} />
                  <span className="text-sm">Cart</span>
                  </Link>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <NotificationCenter />
                <AccountMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;