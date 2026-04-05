import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Search } from 'lucide-react';

const FilterBar = ({ categories }) => {
  const { filters, setFilters } = useContext(AppContext);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-surface-container-low p-4 rounded-2xl flex flex-wrap gap-4 ghost-border items-center">
      
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-on-surface-variant" />
        </div>
        <input
          type="text"
          placeholder="Search descriptions..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-surface-container-high rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface transition-all placeholder:text-on-surface-variant"
        />
      </div>

      {/* Type Filter */}
      <select 
        value={filters.type} 
        onChange={(e) => updateFilter('type', e.target.value)}
        className="bg-surface-container-high px-4 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="All">All Types</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      {/* Category Filter */}
      <select 
        value={filters.category} 
        onChange={(e) => updateFilter('category', e.target.value)}
        className="bg-surface-container-high px-4 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 max-w-[150px] truncate"
      >
        {categories.map(c => (
          <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
        ))}
      </select>

      {/* Sort Filter */}
      <select 
        value={filters.sort} 
        onChange={(e) => updateFilter('sort', e.target.value)}
        className="bg-surface-container-high px-4 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
        <option value="Highest">Highest Amount</option>
        <option value="Lowest">Lowest Amount</option>
      </select>

    </div>
  );
};

export default FilterBar;
