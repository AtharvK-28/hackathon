import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AccountMenu = ({ className = '' }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = { name: 'Rajesh Kumar', email: 'rajesh@example.com' };
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  const handleProfile = () => {
    setOpen(false);
    navigate('/profile');
  };
  const handleOrders = () => {
    setOpen(false);
    navigate('/orders');
  };
  const handleLogout = () => {
    setOpen(false);
    // Clear user data here if implemented
    navigate('/authentication-login-register');
  };

  return (
    <div className={`relative ${className}`}>
      <Button variant="ghost" size="sm" onClick={() => setOpen((prev) => !prev)}>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            {initials}
          </div>
          <span className="hidden lg:block text-sm font-medium">Account</span>
        </div>
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-3 z-50 animate-slide-down">
          <div className="p-4 border-b border-border">
            <div className="font-semibold text-popover-foreground">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
          <div className="divide-y divide-border">
            <button onClick={handleProfile} className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center space-x-2">
              <Icon name="User" size={16} />
              <span>Profile</span>
            </button>
            <button onClick={handleOrders} className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center space-x-2">
              <Icon name="Package" size={16} />
              <span>Orders</span>
            </button>
            <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-error/10 text-error flex items-center space-x-2">
              <Icon name="LogOut" size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu; 