import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { X, AlertTriangle } from 'lucide-react';

const DeleteConfirmModal = ({ transaction, onClose }) => {
  const { deleteTransaction } = useContext(AppContext);

  const confirmDelete = () => {
    deleteTransaction(transaction.id);
    onClose();
  };

  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 glass-panel border-none z-0" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-sm bg-surface-container-low rounded-2xl p-6 shadow-[0_20px_40px_-10px_rgba(255,81,106,0.15)] ghost-border animate-in fade-in zoom-in-95 duration-200 text-center">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 bg-surface-container hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant hover:text-on-surface">
          <X size={16} />
        </button>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tertiary-container/30 mb-5">
          <AlertTriangle className="h-8 w-8 text-tertiary" />
        </div>
        
        <h2 className="text-xl font-display font-semibold mb-2">Delete Transaction?</h2>
        <p className="text-on-surface-variant text-sm mb-6 max-w-[280px] mx-auto leading-relaxed">
          Are you sure you want to delete <span className="font-semibold text-on-surface">"{transaction.description}"</span>? This action cannot be undone.
        </p>

        <div className="flex flex-col gap-2">
          <button onClick={confirmDelete} className="w-full px-5 py-3 text-sm font-semibold bg-tertiary text-on-tertiary font-medium rounded-xl hover:bg-tertiary-container transition-colors shadow-glow shadow-tertiary/20">
            Yes, Delete it
          </button>
          <button onClick={onClose} className="w-full px-5 py-3 text-sm font-semibold hover:bg-surface-container-high text-on-surface rounded-xl transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
