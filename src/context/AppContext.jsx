import React, { createContext, useState, useEffect } from 'react';
import { mockTransactions } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    const storedMockHash = localStorage.getItem('mock_data_hash');
    const currentMockHash = JSON.stringify(mockTransactions);

    if (!saved || storedMockHash !== currentMockHash) {
      localStorage.setItem('mock_data_hash', currentMockHash);
      return mockTransactions;
    }
    
    return JSON.parse(saved);
  });

  const [activeSection, setActiveSection] = useState('dashboard');
  
  const [selectedRole, setSelectedRole] = useState('Viewer');

  const [filters, setFilters] = useState({
    search: '',
    type: 'All', // 'All', 'Income', 'Expense'
    category: 'All',
    sort: 'Newest', // 'Newest', 'Oldest', 'Highest', 'Lowest'
  });

  const [theme, setTheme] = useState('dark');

  // sync to localStorage
  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t) => {
    setTransactions([ { ...t, id: `tx-${Date.now()}` }, ...transactions]);
  };

  const editTransaction = (updatedTx) => {
    setTransactions(transactions.map(t => t.id === updatedTx.id ? updatedTx : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const value = {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    activeSection,
    setActiveSection,
    selectedRole,
    setSelectedRole,
    filters,
    setFilters,
    theme,
    setTheme
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
