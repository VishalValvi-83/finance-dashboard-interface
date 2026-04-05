import React from 'react';
import { Shield, Database, LayoutTemplate, Palette } from 'lucide-react';

const Info = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl pb-8">
      <header className="mb-4 shrink-0">
        <h2 className="text-2xl lg:text-4xl font-display font-bold text-on-surface">System Info & README</h2>
        <p className="text-on-surface-variant text-sm mt-1 lg:mt-2">Documentation and architecture details for CashCanvas.</p>
      </header>

      {/* Overview Section */}
      <section className="bg-surface-container-low p-6 sm:p-8 rounded-3xl ghost-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mt-20 -mr-20"></div>
        <div className="relative z-10 flex items-start gap-4">
          <div className="p-3 bg-primary/20 rounded-xl text-primary mt-1">
            <LayoutTemplate size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Project Overview</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              This application is a frontend-only React dashboard built to the exact specifications of the "CashCanvas" design system. 
              It demonstrates complex state management, data visualization via Recharts, and conditional rendering based on user roles without requiring a backend API.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role Switching */}
        <section className="bg-surface-container-low p-6 rounded-2xl ghost-border flex items-start gap-4">
          <div className="p-3 bg-secondary-container/20 rounded-xl text-secondary mt-1">
            <Shield size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Role Navigation</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-3">
              The application features a mock authentication layer allowing you to switch between two primary roles using the sidebar dropdown:
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant list-inside list-disc">
              <li><strong className="text-on-surface">Viewer:</strong> Read-only access to all metrics and tables.</li>
              <li><strong className="text-on-surface">Admin:</strong> Elevated privileges with full CRUD capabilities (Add, Edit, Delete transactions).</li>
            </ul>
          </div>
        </section>

        {/* State Management */}
        <section className="bg-surface-container-low p-6 rounded-2xl ghost-border flex items-start gap-4">
          <div className="p-3 bg-tertiary-container/20 rounded-xl text-tertiary mt-1">
            <Database size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">State & Persistence</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Global state is managed via React Context API (<code className="bg-surface-container text-primary px-1.5 py-0.5 rounded text-xs mx-1">AppContext</code>).
              The transaction ledger array is automatically serialized and saved to <code className="bg-surface-container text-primary px-1.5 py-0.5 rounded text-xs">localStorage</code> on every unmount/update. 
              This ensures persistence across browser refreshes, simulating a pseudo-database layer.
            </p>
          </div>
        </section>
      </div>

      {/* Features List */}
      <section className="bg-surface-container-low p-6 sm:p-8 rounded-3xl ghost-border">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="text-primary" size={24} />
          <h3 className="text-xl font-semibold">Implemented Features</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-on-surface-variant">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
            <span>Vite + React Core architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
            <span>Tailwind CSS v4 Utility styling</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
            <span>Dynamic Recharts integration</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
            <span>Modular Component Design</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
            <span>Filtered & Paginated Tables</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
            <span>Glassmorphism Design System matching</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Info;
