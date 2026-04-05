import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import SummaryCards from './SummaryCards';
import BarChartComponent from './BarChart';
import DonutChartComponent from './DonutChart';
import RecentTransactions from './RecentTransactions';

const Dashboard = () => {
  const { transactions, setActiveSection } = useContext(AppContext);

  const income = transactions.filter(t => t.type === 'Income').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.type === 'Expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expense;

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-8">
      <header className="mb-2">
        <h2 className="text-3xl font-display font-bold text-on-surface">Portfolio Overview</h2>
        <p className="text-on-surface-variant text-sm mt-1">Your financial health at a glance.</p>
      </header>

      {/* Top Metrics Row */}
      <SummaryCards balance={balance} income={income} expense={expense} />

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BarChartComponent transactions={transactions} />
        </div>
        <div className="lg:col-span-1">
          <DonutChartComponent transactions={transactions} />
        </div>
      </div>

      {/* Bottom Row: Recent Transactions */}
      <div className="w-full">
        <RecentTransactions transactions={transactions} onViewAll={() => setActiveSection('transactions')} />
      </div>
    </div>
  );
};

export default Dashboard;
