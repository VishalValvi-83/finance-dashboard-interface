import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards = ({ balance, income, expense }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Balance Card */}
      <div className="bg-surface-container-high rounded-2xl p-6 ghost-border relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/20 rounded-xl text-primary">
            <Wallet size={24} />
          </div>
          <h3 className="text-lg font-medium text-on-surface-variant font-display">Total Balance</h3>
        </div>
        <p className="text-4xl font-display font-bold text-on-surface tracking-tight">{formatCurrency(balance)}</p>
      </div>

      {/* Income Card */}
      <div className="bg-surface-container-low rounded-2xl p-6 ghost-border relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
         <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-secondary-container rounded-xl text-on-secondary-fixed">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-lg font-medium text-on-surface-variant font-display">Total Income</h3>
        </div>
        <p className="text-3xl font-display font-semibold text-on-surface tracking-tight">{formatCurrency(income)}</p>
      </div>

      {/* Expense Card */}
      <div className="bg-surface-container-low rounded-2xl p-6 ghost-border relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
         <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-tertiary-container rounded-xl text-on-tertiary-fixed">
            <TrendingDown size={24} />
          </div>
          <h3 className="text-lg font-medium text-on-surface-variant font-display">Total Expenses</h3>
        </div>
        <p className="text-3xl font-display font-semibold text-on-surface tracking-tight">{formatCurrency(expense)}</p>
      </div>

    </div>
  );
};

export default SummaryCards;
