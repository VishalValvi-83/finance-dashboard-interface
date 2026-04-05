import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import FilterBar from './FilterBar';
import TransactionTable from './TransactionTable';
import AddTransactionModal from '../modals/AddTransactionModal';
import EditTransactionModal from '../modals/EditTransactionModal';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import { Download } from 'lucide-react';

const Transactions = () => {
  const { transactions, selectedRole, filters } = useContext(AppContext);
  const [modalState, setModalState] = useState({ type: null, data: null });

  const closeModal = () => setModalState({ type: null, data: null });

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      result = result.filter(t => 
        t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.type !== 'All') {
      result = result.filter(t => t.type === filters.type);
    }

    if (filters.category !== 'All') {
      result = result.filter(t => t.category === filters.category);
    }

    result.sort((a, b) => {
      if (filters.sort === 'Newest') return new Date(b.date) - new Date(a.date);
      if (filters.sort === 'Oldest') return new Date(a.date) - new Date(b.date);
      if (filters.sort === 'Highest') return b.amount - a.amount;
      if (filters.sort === 'Lowest') return a.amount - b.amount;
      return 0;
    });

    return result;
  }, [transactions, filters]);

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) return;
    
    const headers = ['ID', 'Date', 'Amount', 'Type', 'Category', 'Description', 'Status'];
    const rows = filteredTransactions.map(t => [
      t.id, t.date, t.amount, t.type, t.category, `"${t.description.replace(/"/g, '""')}"`, t.status
    ]);
    
    let csvContent = headers.join(',') + '\n' + rows.map(e => e.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = ['All', ...new Set(transactions.map(t => t.category))];

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-8">
      <header className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-3xl font-display font-bold text-on-surface">Transactions</h2>
          <p className="text-on-surface-variant text-sm mt-1">Manage and filter your financial records.</p>
        </div>
        
        {selectedRole === 'Admin' && (
          <div className="flex gap-3">
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-surface-container-highest text-on-surface px-5 py-2.5 rounded-xl font-semibold hover:bg-surface-container-high transition-colors border border-outline-variant/30"
            >
              <Download size={18} />
              Export CSV
            </button>
            <button 
              onClick={() => setModalState({ type: 'add', data: null })}
              className="bg-linear-to-r from-primary to-primary-container text-on-primary-fixed px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              + Add Transaction
            </button>
          </div>
        )}
      </header>

      <FilterBar categories={categories} />

      <TransactionTable 
        data={filteredTransactions} 
        onEdit={(tx) => setModalState({ type: 'edit', data: tx })}
        onDelete={(tx) => setModalState({ type: 'delete', data: tx })}
        isAdmin={selectedRole === 'Admin'}
      />

      {modalState.type === 'add' && <AddTransactionModal onClose={closeModal} />}
      {modalState.type === 'edit' && <EditTransactionModal transaction={modalState.data} onClose={closeModal} />}
      {modalState.type === 'delete' && <DeleteConfirmModal transaction={modalState.data} onClose={closeModal} />}
    </div>
  );
};

export default Transactions;
