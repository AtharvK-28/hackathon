import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderTabs = ({ activeTab, onTabChange, activeOrdersCount, historyOrdersCount }) => {
  const tabs = [
    {
      id: 'active',
      label: 'Active Orders',
      icon: 'Clock',
      count: activeOrdersCount
    },
    {
      id: 'history',
      label: 'Order History',
      icon: 'History',
      count: historyOrdersCount
    }
  ];

  return (
    <div className="bg-card border-b border-border sticky top-0 z-10">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab.icon} size={18} />
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <div className={`rounded-full text-xs font-medium min-w-[20px] h-[20px] flex items-center justify-center px-2 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted-foreground text-background'
              }`}>
                {tab.count}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderTabs;