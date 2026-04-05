import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { X } from 'lucide-react';

const AddTransactionModal = ({ onClose }) => {
  const { addTransaction } = useContext(AppContext);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Shopping',
    type: 'Expense'
  });

  const categories = ['Shopping', 'Food & Dining', 'Utilities', 'Transport', 'Entertainment', 'Health & Fitness', 'Income'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.date) return;
    
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 glass-panel border-none z-0" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-surface-container-low rounded-2xl p-6 shadow-glow ghost-border animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display font-semibold">New Transaction</h2>
          <button onClick={onClose} className="p-2 bg-surface-container hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant hover:text-on-surface">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 p-1 bg-surface-container-high rounded-xl mb-4">
            {['Expense', 'Income'].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type, category: type === 'Income' ? 'Income' : 'Shopping' }))}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${formData.type === type ? (type === 'Income' ? 'bg-secondary-container text-on-secondary-fixed' : 'bg-tertiary-container text-on-tertiary-fixed') : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {type}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Description</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Amazon Purchase"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Amount (₹)</label>
              <input 
                type="number" 
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Date</label>
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold hover:bg-surface-container-high text-on-surface rounded-xl transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed rounded-xl hover:opacity-90 transition-opacity">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
