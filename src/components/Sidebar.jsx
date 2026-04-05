import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { LayoutDashboard, ArrowLeftRight, PieChart, Info as InfoIcon, UserCircle2, Sun, Moon } from 'lucide-react';
import { userProfile } from '../data/mockData';

const Sidebar = () => {
  const { activeSection, setActiveSection, selectedRole, setSelectedRole, theme, setTheme } = useContext(AppContext);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'insights', label: 'Insights', icon: PieChart },
    { id: 'info', label: 'Info & README', icon: InfoIcon },
  ];

  return (
    <aside className="w-64 h-full bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col justify-between">
      <div>
        <div className="px-6 py-8">
          <h1 className="text-2xl font-display font-bold gradient-text pb-1 truncate">Lumina Finance</h1>
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                    ? 'bg-primary/10 text-primary relative' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full" />
                )}
                <Icon size={20} className={isActive ? "text-primary" : "text-on-surface-variant group-hover:text-on-surface"} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-outline-variant/30 flex flex-col gap-4">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-colors text-on-surface-variant hover:text-on-surface"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low/50">
          <img src={userProfile.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-primary/20" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">{userProfile.name}</p>
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="text-xs bg-transparent text-primary focus:outline-none cursor-pointer w-full mt-0.5"
            >
              <option value="Viewer" className="bg-surface-container-high text-on-surface">Viewer Mode</option>
              <option value="Admin" className="bg-surface-container-high text-on-surface">Admin Mode</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
