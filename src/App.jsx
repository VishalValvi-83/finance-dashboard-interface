import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './context/AppContext';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Transactions from './components/transactions/Transactions';
import Insights from './components/insights/Insights';
import Info from './components/info/Info';

function App() {
  const { activeSection, theme } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-surface-container-lowest border-b border-outline-variant/30 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-display font-bold gradient-text pb-0.5 truncate">CashCanvas</h1>
          </div>
        </header>

        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
