import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchAndFilter = ({ onSearch, onFilter, filters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    status: '',
    dateRange: '',
    supplier: '',
    minAmount: '',
    maxAmount: ''
  });

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'out for delivery', label: 'Out for Delivery' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' }
  ];

  const supplierOptions = [
    { value: '', label: 'All Suppliers' },
    { value: 'fresh-produce-co', label: 'Fresh Produce Co.' },
    { value: 'veggie-world', label: 'Veggie World' },
    { value: 'spice-garden', label: 'Spice Garden' },
    { value: 'dairy-fresh', label: 'Dairy Fresh' },
    { value: 'grain-master', label: 'Grain Master' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...selectedFilters, [key]: value };
    setSelectedFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: '',
      dateRange: '',
      supplier: '',
      minAmount: '',
      maxAmount: ''
    };
    setSelectedFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const hasActiveFilters = Object.values(selectedFilters).some(value => value !== '');

  return (
    <div className="bg-card border-b border-border p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <Input
          type="search"
          placeholder="Search by order ID, supplier, or product..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filter Toggle and Quick Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2"
        >
          <Icon name="Filter" size={16} />
          <span>Filters</span>
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-primary rounded-full" />
          )}
          <Icon name={isFilterOpen ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-error hover:text-error"
          >
            <Icon name="X" size={16} className="mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-muted/30 rounded-lg p-4 space-y-4 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Status Filter */}
            <Select
              label="Status"
              options={statusOptions}
              value={selectedFilters.status}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Select status"
            />

            {/* Date Range Filter */}
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={selectedFilters.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              placeholder="Select date range"
            />

            {/* Supplier Filter */}
            <Select
              label="Supplier"
              options={supplierOptions}
              value={selectedFilters.supplier}
              onChange={(value) => handleFilterChange('supplier', value)}
              placeholder="Select supplier"
              searchable
            />
          </div>

          {/* Amount Range */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Amount (₹)"
              type="number"
              placeholder="0"
              value={selectedFilters.minAmount}
              onChange={(e) => handleFilterChange('minAmount', e.target.value)}
              min="0"
            />
            <Input
              label="Max Amount (₹)"
              type="number"
              placeholder="10000"
              value={selectedFilters.maxAmount}
              onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
              min="0"
            />
          </div>

          {/* Filter Actions */}
          <div className="flex justify-end space-x-2 pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;