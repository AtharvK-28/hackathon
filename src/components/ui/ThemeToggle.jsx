import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../AppIcon';

const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-10 w-20 items-center rounded-full border border-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background bg-card shadow-elevation-1 ${className}`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Track */}
      <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
        <Icon 
          name="Sun" 
          size={18} 
          className={`transition-all duration-300 ${!isDarkMode ? 'text-warning' : 'text-muted-foreground/40'}`} 
        />
        <Icon 
          name="Moon" 
          size={18} 
          className={`transition-all duration-300 ${isDarkMode ? 'text-primary' : 'text-muted-foreground/40'}`} 
        />
      </div>
      {/* Thumb */}
      <span
        className={`inline-block h-8 w-8 transform rounded-full bg-background border border-primary shadow-elevation-2 transition-all duration-300 ${
          isDarkMode ? 'translate-x-10' : 'translate-x-1'
        } flex items-center justify-center`}
      >
        {isDarkMode ? (
          <Icon name="Moon" size={16} className="text-primary animate-scale-in" />
        ) : (
          <Icon name="Sun" size={16} className="text-warning animate-scale-in" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle; 