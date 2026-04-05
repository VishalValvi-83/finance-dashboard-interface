import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrendChart = ({ transactions }) => {
  const chartData = useMemo(() => {
    const dataObj = {};
    let runningBalance = 20000;

    const sorted = [...transactions].sort((a,b) => new Date(a.date) - new Date(b.date));

    sorted.forEach(tx => {
      const date = new Date(tx.date);
      const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      
      if (tx.type === 'Income') runningBalance += tx.amount;
      else runningBalance -= tx.amount;

      dataObj[month] = runningBalance;
    });

    return Object.keys(dataObj).map(key => ({
      name: key,
      Balance: dataObj[key]
    }));
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-4 rounded-xl shadow-glow border-none">
          <p className="text-on-surface font-semibold mb-2">{label}</p>
          <p className="text-sm font-medium text-primary">
            Balance: ₹{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 ghost-border h-[400px] flex flex-col">
      <h3 className="text-xl font-display font-semibold mb-6">Monthly Balance Trend</h3>
      <div className="flex-1 w-full relative -left-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c0c1ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#c0c1ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3449" vertical={false} />
            <XAxis dataKey="name" stroke="#c7c4d7" tick={{ fill: '#c7c4d7', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#c7c4d7" tick={{ fill: '#c7c4d7', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="Balance" stroke="#c0c1ff" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
