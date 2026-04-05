import React from 'react';
import { ArrowRight, ArrowDownRight, ArrowUpRight } from 'lucide-react';

const RecentTransactions = ({ transactions, onViewAll }) => {
  const recent = transactions.slice(0, 5);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 ghost-border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-display font-semibold">Recent Transactions</h3>
        <button 
          onClick={onViewAll}
          className="text-sm text-primary hover:text-primary-container font-medium flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {recent.map(tx => (
          <div key={tx.id} className="flex justify-between items-center p-4 rounded-xl bg-surface-container-high/50 hover:bg-surface-container transition-colors group">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${tx.type === 'Income' ? 'bg-secondary-container/20 text-secondary' : 'bg-tertiary-container/20 text-tertiary'}`}>
                {tx.type === 'Income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
              </div>
              <div>
                <p className="font-semibold text-on-surface">{tx.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-on-surface-variant">{tx.category}</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="text-xs text-on-surface-variant">{new Date(tx.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <p className={`font-semibold font-display ${tx.type === 'Income' ? 'text-secondary' : 'text-on-surface'}`}>
              {tx.type === 'Income' ? '+' : '-'}{formatCurrency(tx.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
