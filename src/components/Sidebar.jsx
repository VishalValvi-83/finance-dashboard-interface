import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { LayoutDashboard, ArrowLeftRight, PieChart, Info as InfoIcon, Sun, Moon, X } from 'lucide-react';
import { userProfile } from '../data/mockData';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { activeSection, setActiveSection, selectedRole, setSelectedRole, theme, setTheme } = useContext(AppContext);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'insights', label: 'Insights', icon: PieChart },
    { id: 'info', label: 'Info & README', icon: InfoIcon },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 h-full bg-surface-container-lowest border-r border-outline-variant/30 
        flex flex-col justify-between
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div>
          <div className="px-6 py-6 lg:py-8 flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold gradient-text pb-1 truncate">Lumina Finance</h1>
            {/* Close Button on Mobile */}
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="px-4 space-y-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
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
            <img src={userProfile.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-primary/20 shrink-0" />
            <div className="flex-1 min-w-0">
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
    </>
  );
};

export default Sidebar;
