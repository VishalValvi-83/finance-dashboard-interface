import React, { useState } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';

const TransactionTable = ({ data, onEdit, onDelete, isAdmin }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const getCategoryColor = (category) => {
    // Explicit color assignments to avoid hash collisions
    if (category === 'Income') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (category === 'Food & Dining') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    
    const colors = [
      'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'bg-pink-500/10 text-pink-400 border-pink-500/20',
      'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'bg-teal-500/10 text-teal-400 border-teal-500/20',
      'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    ];
    let sum = 0;
    for (let i = 0; i < category.length; i++) sum += category.charCodeAt(i);
    return colors[sum % colors.length];
  };

  if (data.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center bg-surface-container-low rounded-2xl ghost-border">
        <p className="text-on-surface-variant font-medium">No transactions found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low rounded-2xl ghost-border overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high/50 text-on-surface-variant text-sm border-b border-outline-variant/30">
              <th className="py-4 px-6 font-medium">Date</th>
              <th className="py-4 px-6 font-medium">Description</th>
              <th className="py-4 px-6 font-medium hidden md:table-cell">Category</th>
              <th className="py-4 px-6 font-medium hidden md:table-cell">Type</th>
              <th className="py-4 px-6 font-medium text-right">Amount</th>
              {isAdmin && <th className="py-4 px-6 font-medium text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((tx) => (
              <tr key={tx.id} className="border-b border-outline-variant/10 hover:bg-surface-container-high/30 transition-colors group">
                <td className="py-4 px-6 whitespace-nowrap text-sm">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="py-4 px-6 font-medium">{tx.description}</td>
                <td className="py-4 px-6 hidden md:table-cell">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getCategoryColor(tx.category)}`}>
                    {tx.category}
                  </span>
                </td>
                <td className="py-4 px-6 hidden md:table-cell">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${tx.type === 'Income' ? 'bg-secondary-container/20 text-secondary' : 'bg-tertiary-container/20 text-tertiary'
                    }`}>
                    {tx.type}
                  </span>
                </td>
                <td className={`py-4 px-6 text-right font-display font-semibold ${tx.type === 'Income' ? 'text-secondary' : 'text-on-surface'}`}>
                  {tx.type === 'Income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </td>

                {isAdmin && (
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2 ">
                      <button onClick={() => onEdit(tx)} className="p-2 bg-surface-container-highest rounded-lg text-primary hover:text-primary-container transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => onDelete(tx)} className="p-2 bg-tertiary-container/10 rounded-lg text-tertiary hover:bg-tertiary-container/30 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-outline-variant/30 flex justify-between items-center bg-surface-container-low/50">
          <p className="text-sm text-on-surface-variant flex-1">
            Showing <span className="text-on-surface font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-on-surface font-medium">{Math.min(currentPage * itemsPerPage, data.length)}</span> of <span className="text-on-surface font-medium">{data.length}</span> entries
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-3 py-1 text-sm bg-surface-container-high rounded-lg hover:bg-surface-container-highest disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-1 px-2 text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-3 py-1 text-sm bg-surface-container-high rounded-lg hover:bg-surface-container-highest disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
