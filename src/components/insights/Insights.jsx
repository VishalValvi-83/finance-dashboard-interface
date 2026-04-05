import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import InsightCards from './InsightCards';
import TrendChart from './TrendChart';
import CategoryChart from './CategoryChart';
import HealthPanel from './HealthPanel';

const Insights = () => {
  const { transactions } = useContext(AppContext);

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-8">
      <header className="mb-2 shrink-0">
        <h2 className="text-2xl lg:text-4xl font-display font-bold text-on-surface">Insights & Analytics</h2>
        <p className="text-on-surface-variant text-sm mt-1 lg:mt-2">Deep dive into your financial habits and trends.</p>
      </header>

      {/* Top 4 Stats */}
      <InsightCards transactions={transactions} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TrendChart transactions={transactions} />
          <CategoryChart transactions={transactions} />
        </div>
        <div className="lg:col-span-1">
          <HealthPanel transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Insights;
