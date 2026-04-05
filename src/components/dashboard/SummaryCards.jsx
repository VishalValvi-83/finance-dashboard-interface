import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards = ({ balance, income, expense }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

      {/* Balance Card */}
      <div className="bg-surface-container-high rounded-2xl p-4 md:p-6 ghost-border relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 min-w-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
        <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
          <div className="p-2 lg:p-3 bg-primary/20 rounded-xl text-primary shrink-0">
            <Wallet size={24} />
          </div>
          <h3 className="text-base lg:text-lg font-medium text-on-surface-variant font-display truncate">Total Balance</h3>
        </div>
        <p className="text-3xl lg:text-4xl font-display font-bold text-on-surface tracking-tight truncate">{formatCurrency(balance)}</p>
      </div>

      {/* Income Card */}
      <div className="bg-surface-container-low rounded-2xl p-4 md:p-6 ghost-border relative overflow-hidden group hover:bg-surface-container hover:-translate-y-1 transition-all duration-300 min-w-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
        <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
          <div className="p-2 lg:p-3 bg-secondary-container rounded-xl text-on-secondary-fixed shrink-0">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-base lg:text-lg font-medium text-on-surface-variant font-display truncate">Total Income</h3>
        </div>
        <p className="text-2xl lg:text-3xl font-display font-semibold text-on-surface tracking-tight truncate">{formatCurrency(income)}</p>
      </div>

      {/* Expense Card */}
      <div className="bg-surface-container-low rounded-2xl p-4 md:p-6 ghost-border relative overflow-hidden group hover:bg-surface-container hover:-translate-y-1 transition-all duration-300 min-w-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
        <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
          <div className="p-2 lg:p-3 bg-tertiary-container rounded-xl text-on-tertiary-fixed shrink-0">
            <TrendingDown size={24} />
          </div>
          <h3 className="text-base lg:text-lg font-medium text-on-surface-variant font-display truncate">Total Expenses</h3>
        </div>
        <p className="text-2xl lg:text-3xl font-display font-semibold text-on-surface tracking-tight truncate">{formatCurrency(expense)}</p>
      </div>

    </div>
  );
};

export default SummaryCards;
