import React from 'react';
import { AlertCircle, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

const HealthPanel = ({ transactions }) => {
  const income = transactions.filter(t => t.type === 'Income').reduce((a,c) => a + c.amount, 0);
  const expense = transactions.filter(t => t.type === 'Expense').reduce((a,c) => a + c.amount, 0);
  
  const observations = [
    {
      id: 1,
      type: income > expense ? 'success' : 'warning',
      text: income > expense 
        ? "Your income exceeds expenses by a healthy margin this period." 
        : "Warning: Your expenses are currently exceeding your income.",
      icon: income > expense ? CheckCircle2 : AlertTriangle
    },
    {
      id: 2,
      type: 'info',
      text: "You spent the most on 'Shopping' category. Consider reviewing related subscriptions.",
      icon: TrendingUp
    },
    {
      id: 3,
      type: 'neutral',
      text: "No unusual transaction detected in the past 30 days.",
      icon: AlertCircle
    }
  ];

  const getTypeStyles = (type) => {
    switch(type) {
      case 'success': return 'border-secondary/20 bg-secondary-container/10 text-secondary';
      case 'warning': return 'border-tertiary/20 bg-tertiary-container/10 text-tertiary';
      case 'info': return 'border-primary/20 bg-primary/10 text-primary';
      default: return 'border-outline-variant/30 bg-surface-container-high text-on-surface-variant';
    }
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 ghost-border h-full">
      <h3 className="text-xl font-display font-semibold mb-6">Financial Health</h3>
      
      <div className="space-y-4">
        {observations.map(obs => {
          const Icon = obs.icon;
          const styles = getTypeStyles(obs.type);
          return (
            <div key={obs.id} className={`p-4 rounded-xl border ${styles} flex gap-3 items-start`}>
              <Icon size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm font-medium leading-relaxed">{obs.text}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-5 bg-gradient-to-br from-surface-container-high to-surface-container rounded-2xl border border-outline-variant/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mt-10 -mr-10"></div>
        <h4 className="text-on-surface font-semibold mb-2 relative z-10">AI Suggestion</h4>
        <p className="text-sm text-on-surface-variant leading-relaxed relative z-10">
          Based on your utility bills, you might save up to 12% by migrating your internet and streaming services to an aggregate bundle.
        </p>
      </div>
    </div>
  );
};

export default HealthPanel;
