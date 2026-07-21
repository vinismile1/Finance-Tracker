import React, { useState } from 'react';
import { Menu, Bell, Search, Sparkles, DollarSign, IndianRupee, Euro, PoundSterling } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFinance } from '../context/FinanceContext';

export const Header = ({ onOpenSidebar, pageTitle = 'Dashboard' }) => {
  const { user } = useAuth();
  const { currency, changeCurrency, reminders } = useFinance();
  const [showNotifications, setShowNotifications] = useState(false);

  const dueSoonReminders = reminders.filter(r => r.status === 'Due Soon' || r.status === 'Overdue');

  const currencies = [
    { code: 'INR', symbol: '₹', icon: IndianRupee },
    { code: 'USD', symbol: '$', icon: DollarSign },
    { code: 'EUR', symbol: '€', icon: Euro },
    { code: 'GBP', symbol: '£', icon: PoundSterling }
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#F4F1E8]/95 backdrop-blur-md border-b border-[#DDE3D8] px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-[#1D2722] hover:text-[#8A6A4A] bg-[#DDE3D8] border border-[#18352C]/20"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl lg:text-2xl font-bold font-['Playfair_Display'] text-[#1D2722] tracking-wide">
            {pageTitle}
          </h1>
          <p className="text-xs text-[#18352C]/70 hidden sm:block">
            Welcome back, <span className="text-[#18352C] font-semibold">{user?.name || 'Member'}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Currency Switcher */}
        <div className="flex items-center bg-[#DDE3D8] border border-[#18352C]/20 rounded-xl p-1">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => changeCurrency(c.code, c.symbol)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currency === c.code 
                  ? 'bg-[#18352C] text-[#F4F1E8] shadow-sm' 
                  : 'text-[#1D2722]/70 hover:text-[#1D2722]'
              }`}
            >
              {c.symbol} {c.code}
            </button>
          ))}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-[#DDE3D8] border border-[#18352C]/20 text-[#1D2722] hover:border-[#B69A6A] transition-all"
          >
            <Bell className="w-5 h-5" />
            {dueSoonReminders.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#B69A6A] text-[#18352C] text-[10px] font-bold flex items-center justify-center animate-pulse">
                {dueSoonReminders.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-[#DDE3D8] border border-[#18352C]/30 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#18352C]/20 mb-3">
                <span className="font-semibold text-sm text-[#1D2722]">Payment Alerts</span>
                <span className="text-xs bg-[#B69A6A]/20 text-[#18352C] px-2 py-0.5 rounded-full font-medium">
                  {dueSoonReminders.length} Pending
                </span>
              </div>

              {dueSoonReminders.length === 0 ? (
                <p className="text-xs text-[#18352C]/70 py-4 text-center">All obligations up to date!</p>
              ) : (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {dueSoonReminders.map(rem => (
                    <div key={rem.id} className="p-2.5 rounded-xl bg-[#F4F1E8] border border-[#18352C]/20 text-xs flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-[#1D2722]">{rem.title}</p>
                        <p className="text-[10px] text-[#18352C]/70">Due: {rem.dueDate}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${rem.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-[#B69A6A]/20 text-[#18352C]'}`}>
                        {rem.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Mini Profile Avatar */}
        <div className="hidden md:flex items-center gap-2 pl-2 border-l border-[#18352C]/20">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#18352C] bg-[#F4F1E8] shadow-sm">
            <img 
              src={user?.avatar} 
              alt="Profile Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
