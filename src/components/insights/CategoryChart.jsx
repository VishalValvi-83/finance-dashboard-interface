import React, { useContext, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppContext } from './../../context/AppContext';

const CategoryChart = ({ transactions }) => {
  const { theme } = useContext(AppContext);

  const chartData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    const categories = {};

    expenses.forEach(tx => {
      categories[tx.category] = (categories[tx.category] || 0) + tx.amount;
    });

    return Object.keys(categories)
      .map(key => ({
        name: key,
        value: categories[key]
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 rounded-lg shadow-glow border-none">
          <p className="text-on-surface text-sm font-medium">
            {label}: <span className="font-bold text-tertiary">₹{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 ghost-border h-[300px] flex flex-col">
      <h3 className="text-xl font-display font-semibold mb-6">Top 5 Spending Categories</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3449" horizontal={false} />
            <XAxis type="number" stroke="#c7c4d7" tick={{ fill: theme === 'dark' ? '#c7c4d7' : '#333', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" stroke="#c7c4d7" tick={{ fill: theme === 'dark' ? '#dae2fd' : '#818cf8', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: theme === 'dark' ? '#222a3d' : '#e2e8f0' }}
              content={<CustomTooltip />}
            />
            <Bar dataKey="value" fill="#ffb2b7" radius={[0, 4, 4, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
