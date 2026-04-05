import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const BarChartComponent = ({ transactions }) => {
  const chartData = useMemo(() => {
    const dataObj = {};

    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const month = date.toLocaleString('default', { month: 'short' });

      if (!dataObj[month]) {
        dataObj[month] = { name: month, Income: 0, Expense: 0 };
      }

      if (tx.type === 'Income') {
        dataObj[month].Income += tx.amount;
      } else {
        dataObj[month].Expense += tx.amount;
      }
    });

    const orderedMonths = ['Aug', 'Sep', 'Oct'];
    return orderedMonths.map(m => dataObj[m] || { name: m, Income: 0, Expense: 0 });
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-4 rounded-xl shadow-glow">
          <p className="text-on-surface font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 ghost-border h-full">
      <h3 className="text-xl font-display font-semibold mb-6">Income vs Expenses</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3449" vertical={false} />
            <XAxis dataKey="name" stroke="#c7c4d7" tick={{ fill: '#c7c4d7', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#c7c4d7" tick={{ fill: '#c7c4d7', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
            <Tooltip cursor={{ fill: '#222a3d' }} content={<CustomTooltip />} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="Income" fill="#c0c1ff" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="Expense" fill="#ffb2b7" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
