import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Search, ChevronDown, Check } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';

const CustomSelect = ({ value, onChange, options, width = 'w-40' }) => {
  const selected = options.find(o => o.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={`relative ${width}`}>
        <ListboxButton className="w-full flex items-center justify-between bg-surface-container-high px-4 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer text-on-surface">
          <span className="truncate">{selected?.label || value}</span>
          <ChevronDown size={14} className="ml-2 shrink-0 ui-open:rotate-180 transition-transform duration-200 text-on-surface-variant" />
        </ListboxButton>

        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="absolute top-full left-0 mt-1 w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl shadow-glow overflow-hidden z-50 focus:outline-none max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <ListboxOption
                key={opt.value}
                value={opt.value}
                className="text-sm px-3 py-2 cursor-pointer flex items-center justify-between transition-colors data-focus:bg-surface-container-low data-selected:bg-primary/10 data-selected:text-primary text-on-surface"
              >
                {({ selected }) => (
                  <>
                    <span className="truncate">{opt.label}</span>
                    {selected && <Check size={12} className="shrink-0 ml-2" />}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
};

const FilterBar = ({ categories }) => {
  const { filters, setFilters } = useContext(AppContext);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const typeOptions = [
    { value: 'All', label: 'All Types' },
    { value: 'Income', label: 'Income' },
    { value: 'Expense', label: 'Expense' },
  ];

  const categoryOptions = categories.map(c => ({
    value: c,
    label: c === 'All' ? 'All Categories' : c,
  }));

  const sortOptions = [
    { value: 'Newest', label: 'Newest First' },
    { value: 'Oldest', label: 'Oldest First' },
    { value: 'Highest', label: 'Highest Amount' },
    { value: 'Lowest', label: 'Lowest Amount' },
  ];

  return (
    <div className="bg-surface-container-low p-4 rounded-2xl flex flex-wrap gap-4 ghost-border items-center">

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

      <CustomSelect value={filters.type} onChange={(v) => updateFilter('type', v)} options={typeOptions} width="w-36" />
      <CustomSelect value={filters.category} onChange={(v) => updateFilter('category', v)} options={categoryOptions} width="w-44" />
      <CustomSelect value={filters.sort} onChange={(v) => updateFilter('sort', v)} options={sortOptions} width="w-44" />

    </div>
  );
};

export default FilterBar;
