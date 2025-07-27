import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionButton = ({ title, subtitle, icon, to, onClick, color = 'text-primary', bgColor = 'bg-primary/10' }) => {
  const content = (
    <div className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon name={icon} size={20} className={color} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-card-foreground text-sm">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
      </div>
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return <div onClick={onClick}>{content}</div>;
};

export default QuickActionButton;