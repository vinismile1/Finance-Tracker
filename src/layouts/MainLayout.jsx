import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Financial Overview';
      case '/expenses': return 'Expense Management';
      case '/analytics': return 'Spending & Insights';
      case '/savings': return 'Savings Goals';
      case '/reminders': return 'Payment Reminders';
      case '/profile': return 'My Profile';
      case '/settings': return 'Platform Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] text-[#1D2722] flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 min-h-screen">
        <Header 
          onOpenSidebar={() => setSidebarOpen(true)} 
          pageTitle={getTitle()} 
        />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <footer className="py-4 px-8 border-t border-[#DDE3D8] text-center text-xs text-[#18352C]/70">
          <p>© 2026 V.SAVE — Crafting Financial Elegance. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
