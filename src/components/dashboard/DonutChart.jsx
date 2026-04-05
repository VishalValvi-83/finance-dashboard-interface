import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DonutChartComponent = ({ transactions }) => {
  const chartData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    const categories = {};

    expenses.forEach(tx => {
      categories[tx.category] = (categories[tx.category] || 0) + tx.amount;
    });

    return Object.keys(categories).map(key => ({
      name: key,
      value: categories[key]
    })).sort((a,b) => b.value - a.value).slice(0, 4); // Top 4
  }, [transactions]);

  const COLORS = ['#8083ff', '#4edea3', '#ffb2b7', '#dae2fd'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 rounded-lg shadow-glow border-none">
          <p className="text-on-surface text-sm font-medium">
            {payload[0].name}: <span className="font-bold">₹{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 ghost-border h-full flex flex-col">
      <h3 className="text-xl font-display font-semibold mb-2">Top Expenses</h3>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonutChartComponent;
