import React, { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Transactions from './components/transactions/Transactions';
import Insights from './components/insights/Insights';
import Info from './components/info/Info';

function App() {
  const { activeSection, theme } = useContext(AppContext);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'transactions': return <Transactions />;
      case 'insights': return <Insights />;
      case 'info': return <Info />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-on-surface font-body">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
