import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const mockNotifications = [
  { id: 1, title: 'Order Shipped', message: 'Your order #1234 has been shipped.', read: false, time: '2m ago' },
  { id: 2, title: 'New Deal', message: 'Fresh morning deals are now live!', read: false, time: '10m ago' },
  { id: 3, title: 'Payment Received', message: 'Payment for order #1233 received.', read: true, time: '1h ago' },
];

const NotificationCenter = ({ className = '' }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (!open) {
      setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button variant="ghost" size="sm" onClick={handleToggle} className="relative">
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-error rounded-full animate-pulse" />
        )}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-3 z-50 animate-slide-down">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="font-semibold text-popover-foreground">Notifications</span>
            <Button variant="ghost" size="icon" onClick={handleToggle}>
              <Icon name="X" size={16} />
            </Button>
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">No notifications</div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className={`p-4 flex flex-col gap-1 ${n.read ? 'bg-popover' : 'bg-primary/10'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-popover-foreground">{n.title}</span>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{n.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;