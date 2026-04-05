import React, { useMemo } from 'react';
import { Award, Target, CalendarDays, Activity } from 'lucide-react';

const InsightCards = ({ transactions }) => {
  const stats = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    const income = transactions.filter(t => t.type === 'Income');

    // Top Category
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    const topCategory = Object.keys(categoryTotals).sort((a, b) => categoryTotals[b] - categoryTotals[a])[0] || 'N/A';

    // Best Income Month
    const monthIncome = income.reduce((acc, curr) => {
      const month = new Date(curr.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      acc[month] = (acc[month] || 0) + curr.amount;
      return acc;
    }, {});
    const bestMonth = Object.keys(monthIncome).sort((a, b) => monthIncome[b] - monthIncome[a])[0] || 'N/A';

    // Avg Expense
    const avgExpense = expenses.length > 0 ? (expenses.reduce((a, c) => a + c.amount, 0) / expenses.length).toFixed(0) : 0;

    // Savings Ratio
    const totalIncome = income.reduce((a, c) => a + c.amount, 0);
    const totalExpense = expenses.reduce((a, c) => a + c.amount, 0);
    const ratio = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : 0;

    return { topCategory, bestMonth, avgExpense, ratio };
  }, [transactions]);

  const cards = [
    { title: 'Top Spending Category', value: stats.topCategory, icon: Target, color: 'text-primary', bg: 'bg-primary/20' },
    { title: 'Best Income Month', value: stats.bestMonth, icon: Award, color: 'text-on-secondary-fixed', bg: 'bg-secondary-container' },
    { title: 'Average Expense', value: `₹${stats.avgExpense}`, icon: CalendarDays, color: 'text-on-tertiary-fixed', bg: 'bg-tertiary-container' },
    { title: 'Savings Ratio', value: `${stats.ratio}%`, icon: Activity, color: 'text-on-surface-variant', bg: 'bg-surface-container-highest' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div key={i} className="bg-surface-container-low p-4 lg:p-5 rounded-2xl ghost-border flex items-center gap-3 lg:gap-4 group hover:bg-surface-container transition-all hover:-translate-y-1 duration-300 min-w-0">
            <div className={`p-2 lg:p-3 rounded-xl shrink-0 ${c.bg} ${c.color}`}>
              <Icon size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] lg:text-xs text-on-surface-variant font-medium mb-0.5 lg:mb-1 uppercase tracking-wider truncate">{c.title}</p>
              <p className="text-lg lg:text-xl font-display font-semibold text-on-surface truncate">{c.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InsightCards;
