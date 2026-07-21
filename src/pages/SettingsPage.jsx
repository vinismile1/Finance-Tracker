import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  Trash2,
  Sparkles,
  LogOut
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SettingsPage = () => {
  const { currency, changeCurrency, dateFormat, setDateFormat, expenses, savingsGoals, reminders } = useFinance();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    billAlerts: true,
    monthlyDigest: true,
    goalMilestones: true
  });

  const [successMsg, setSuccessMsg] = useState('');

  const handleCurrencyChange = (e) => {
    const val = e.target.value;
    const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
    changeCurrency(val, symbols[val] || '₹');
    showFeedback('Base currency updated!');
  };

  const handleDateFormatChange = (e) => {
    setDateFormat(e.target.value);
    showFeedback('Date format updated!');
  };

  const toggleNotif = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    showFeedback('Notification preferences updated!');
  };

  const showFeedback = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const exportDataJSON = () => {
    const data = {
      version: 'vsave_2.0',
      exportedAt: new Date().toISOString(),
      expenses,
      savingsGoals,
      reminders
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute("download", `VSAVE_Financial_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showFeedback('JSON backup downloaded successfully!');
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 lg:p-8 shadow-cream flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-['Playfair_Display'] text-[#1D2722]">Platform Preferences</h2>
          <p className="text-xs text-[#18352C]/70">
            Customize currencies, date formatting, notifications, and export options.
          </p>
        </div>

        {successMsg && (
          <div className="px-4 py-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Currency & Localization */}
        <div className="bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 shadow-cream space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#18352C]/20">
            <Globe className="w-5 h-5 text-[#18352C]" />
            <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#1D2722]">Localization & Currency</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-2">Base Preferred Currency</label>
            <select 
              value={currency}
              onChange={handleCurrencyChange}
              className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-3 text-sm text-[#1D2722] outline-none cursor-pointer"
            >
              <option value="INR">₹ INR — Indian Rupee</option>
              <option value="USD">$ USD — US Dollar</option>
              <option value="EUR">€ EUR — Euro</option>
              <option value="GBP">£ GBP — British Pound</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-2">Date Format Display</label>
            <select 
              value={dateFormat}
              onChange={handleDateFormatChange}
              className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-3 text-sm text-[#1D2722] outline-none cursor-pointer"
            >
              <option value="YYYY-MM-DD">YYYY-MM-DD (2026-07-21)</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (21/07/2026)</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY (07/21/2026)</option>
            </select>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 shadow-cream space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#18352C]/20">
            <Bell className="w-5 h-5 text-[#18352C]" />
            <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#1D2722]">Alerts & Communications</h3>
          </div>

          <div className="space-y-4">
            {[
              { key: 'billAlerts', label: 'Bill & Reminder Notifications', desc: 'Alerts when upcoming payments are due in <= 3 days' },
              { key: 'monthlyDigest', label: 'Monthly Financial Digest', desc: 'Summary of spending trends and category distribution' },
              { key: 'goalMilestones', label: 'Savings Goal Milestones', desc: 'Celebratory alerts when reaching 50%, 75%, 100% target' }
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-2xl bg-[#F4F1E8] border border-[#18352C]/20">
                <div>
                  <p className="text-xs font-bold text-[#1D2722]">{item.label}</p>
                  <p className="text-[11px] text-[#18352C]/70">{item.desc}</p>
                </div>
                <button 
                  onClick={() => toggleNotif(item.key)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    notifications[item.key] ? 'bg-[#18352C]' : 'bg-[#DDE3D8] border border-[#18352C]/30'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full transition-transform ${
                    notifications[item.key] ? 'translate-x-6 bg-[#F4F1E8]' : 'translate-x-0 bg-[#18352C]/60'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Export & Danger Zone */}
      <div className="bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 shadow-cream space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#18352C]/20">
          <Download className="w-5 h-5 text-[#18352C]" />
          <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#1D2722]">Data Export & Session Management</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={exportDataJSON}
            className="flex-1 py-3 px-4 rounded-xl bg-[#F4F1E8] border border-[#18352C]/30 hover:border-[#18352C] text-[#18352C] font-bold text-xs flex items-center justify-center gap-2 transition-all hover:bg-[#18352C] hover:text-[#F4F1E8]"
          >
            <Download className="w-4 h-4" />
            <span>Export Financial Data (JSON)</span>
          </button>

          <button 
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-red-100 border border-red-300 text-red-900 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-200 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out All Sessions</span>
          </button>
        </div>
      </div>
    </div>
  );
};
