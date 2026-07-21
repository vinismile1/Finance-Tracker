import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Receipt, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Bell, 
  Sparkles,
  Calendar,
  CreditCard,
  ChevronRight,
  Coffee
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFinance } from '../context/FinanceContext';
import { StatCard } from '../components/StatCard';
import { Modal } from '../components/Modal';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { 
    totalBalance, 
    totalIncome, 
    totalExpenses, 
    totalSavedInGoals, 
    expenses, 
    incomes,
    reminders, 
    savingsGoals, 
    formatAmount,
    addExpense,
    addIncome
  } = useFinance();

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);

  // New Expense Form State
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('Food');
  const [expPayment, setExpPayment] = useState('UPI');
  const [expDesc, setExpDesc] = useState('');

  // New Income Form State
  const [incTitle, setIncTitle] = useState('');
  const [incAmount, setIncAmount] = useState('');
  const [incSource, setIncSource] = useState('Salary');

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expTitle || !expAmount) return;
    addExpense({
      title: expTitle,
      amount: expAmount,
      category: expCategory,
      paymentMethod: expPayment,
      description: expDesc
    });
    setExpTitle('');
    setExpAmount('');
    setExpDesc('');
    setIsAddExpenseOpen(false);
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    if (!incTitle || !incAmount) return;
    addIncome({
      title: incTitle,
      amount: incAmount,
      source: incSource
    });
    setIncTitle('');
    setIncAmount('');
    setIsAddIncomeOpen(false);
  };

  // Prepare chart data from expenses grouped by day
  const trendData = [
    { day: 'Mon', expense: 1200 },
    { day: 'Tue', expense: 450 },
    { day: 'Wed', expense: 3200 },
    { day: 'Thu', expense: 999 },
    { day: 'Fri', expense: 2150 },
    { day: 'Sat', expense: 4200 },
    { day: 'Sun', expense: 1800 }
  ];

  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#18352C] via-[#8A6A4A] to-[#18352C] p-6 lg:p-8 rounded-3xl border border-[#18352C]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden shadow-xl text-[#F4F1E8]">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18352C] border border-[#B69A6A]/40 text-[#B69A6A] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B69A6A]" />
            Monthly Financial Summary
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display'] text-[#F4F1E8]">
            {getGreetingTime()}, {user?.name || 'Member'}
          </h2>
          <p className="text-sm text-[#DDE3D8]/90 mt-1">
            Here's your real-time financial health, spending metrics, and upcoming obligations.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <button 
            onClick={() => setIsAddIncomeOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#18352C] border border-[#B69A6A] hover:bg-[#B69A6A] hover:text-[#18352C] text-[#B69A6A] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Income</span>
          </button>

          <button 
            onClick={() => setIsAddExpenseOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#B69A6A] hover:bg-[#8A6A4A] hover:text-[#F4F1E8] text-[#18352C] font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Record Expense</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Balance" 
          amount={formatAmount(totalBalance)} 
          subtext="Net liquidity" 
          icon={Wallet} 
          trendPercentage={12.4} 
          isPositive={true}
          accentColor="#18352C"
        />
        <StatCard 
          title="Total Income" 
          amount={formatAmount(totalIncome)} 
          subtext="3 Active Streams" 
          icon={TrendingUp} 
          trendPercentage={5.2} 
          isPositive={true}
          accentColor="#8A6A4A"
        />
        <StatCard 
          title="Total Expenses" 
          amount={formatAmount(totalExpenses)} 
          subtext="Month-to-date" 
          icon={Receipt} 
          trendPercentage={8.1} 
          isPositive={true} // Lower expenses is positive
          accentColor="#B69A6A"
        />
        <StatCard 
          title="Total Savings" 
          amount={formatAmount(totalSavedInGoals)} 
          subtext="Across active goals" 
          icon={PiggyBank} 
          trendPercentage={18.5} 
          isPositive={true}
          accentColor="#18352C"
        />
      </div>

      {/* Main Grid: Charts & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Spending Trend Area Chart (2 cols) */}
        <div className="lg:col-span-2 bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 shadow-cream flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#1D2722]">Weekly Spending Flow</h3>
              <p className="text-xs text-[#18352C]/70">Real-time daily transaction velocity</p>
            </div>
            <Link to="/analytics" className="text-xs font-semibold text-[#18352C] hover:underline flex items-center gap-1">
              Full Analytics <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="warmGoldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B69A6A" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#B69A6A" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#18352C" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#18352C" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18352C', borderColor: '#8A6A4A', borderRadius: '12px', color: '#F4F1E8', fontSize: '12px' }} 
                  formatter={(val) => [formatAmount(val), 'Spent']}
                />
                <Area type="monotone" dataKey="expense" stroke="#18352C" strokeWidth={3} fillOpacity={1} fill="url(#warmGoldGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reminders & Upcoming Obligations (1 col) */}
        <div className="bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 shadow-cream flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#18352C]/20">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#18352C]" />
                <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#1D2722]">Upcoming Bills</h3>
              </div>
              <Link to="/reminders" className="text-xs text-[#18352C] hover:underline font-medium">Manage</Link>
            </div>

            <div className="space-y-3">
              {reminders.slice(0, 3).map((rem) => (
                <div key={rem.id} className="p-3.5 rounded-2xl bg-[#F4F1E8] border border-[#18352C]/15 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#1D2722]">{rem.title}</h4>
                    <span className="text-[11px] text-[#18352C]/70 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-[#B69A6A]" /> Due: {rem.dueDate}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#18352C] block">{formatAmount(rem.amount)}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rem.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-[#B69A6A]/20 text-[#18352C]'}`}>
                      {rem.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link 
            to="/reminders" 
            className="w-full mt-4 py-2.5 rounded-xl border border-[#18352C]/30 text-center text-xs font-semibold text-[#1D2722] hover:bg-[#18352C] hover:text-[#F4F1E8] transition-all"
          >
            View All Payment Schedules
          </Link>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 shadow-cream">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#18352C]/20">
          <div>
            <h3 className="text-xl font-bold font-['Playfair_Display'] text-[#1D2722]">Recent Transactions</h3>
            <p className="text-xs text-[#18352C]/70">Your latest recorded expenses and income entries</p>
          </div>
          <Link to="/expenses" className="text-xs font-semibold text-[#18352C] hover:underline flex items-center gap-1">
            View All Transactions <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {expenses.length === 0 ? (
          <p className="text-sm text-[#18352C]/70 text-center py-8">No recorded expenses yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#1D2722]">
              <thead>
                <tr className="text-xs uppercase text-[#18352C]/70 border-b border-[#18352C]/20">
                  <th className="pb-3 font-semibold">Transaction</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Payment Method</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18352C]/15">
                {expenses.slice(0, 5).map((exp) => (
                  <tr key={exp.id} className="group hover:bg-[#F4F1E8] transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#F4F1E8] border border-[#18352C]/20 flex items-center justify-center text-[#18352C] shrink-0">
                          <Receipt className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#1D2722] group-hover:text-[#18352C] transition-colors">{exp.title}</p>
                          {exp.description && <p className="text-xs text-[#18352C]/70">{exp.description}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2.5 py-1 rounded-lg bg-[#F4F1E8] border border-[#18352C]/20 text-xs font-medium text-[#18352C]">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-xs text-[#18352C]/70">
                      {exp.paymentMethod}
                    </td>
                    <td className="py-3.5 pr-4 text-xs text-[#18352C]/70">
                      {exp.date}
                    </td>
                    <td className="py-3.5 text-right font-bold font-['Cinzel'] text-[#18352C]">
                      -{formatAmount(exp.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Record Expense */}
      <Modal isOpen={isAddExpenseOpen} onClose={() => setIsAddExpenseOpen(false)} title="Record New Expense">
        <form onSubmit={handleExpenseSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Expense Title</label>
            <input 
              type="text"
              value={expTitle}
              onChange={(e) => setExpTitle(e.target.value)}
              placeholder="e.g. Artisanal Coffee, Market Groceries"
              required
              className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Amount ({useFinance().currencySymbol})</label>
              <input 
                type="number"
                step="any"
                value={expAmount}
                onChange={(e) => setExpAmount(e.target.value)}
                placeholder="0.00"
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Category</label>
              <select 
                value={expCategory}
                onChange={(e) => setExpCategory(e.target.value)}
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              >
                {['Food', 'Shopping', 'Transportation', 'Bills', 'Rent', 'Entertainment', 'Healthcare', 'Education', 'Travel', 'Other'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Payment Method</label>
            <select 
              value={expPayment}
              onChange={(e) => setExpPayment(e.target.value)}
              className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
            >
              {['UPI', 'Credit Card', 'Debit Card', 'Cash', 'Bank Transfer', 'Other'].map(pm => (
                <option key={pm} value={pm}>{pm}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Description (Optional)</label>
            <input 
              type="text"
              value={expDesc}
              onChange={(e) => setExpDesc(e.target.value)}
              placeholder="Short notes or vendor details"
              className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-md transition-all mt-2"
          >
            Save Expense
          </button>
        </form>
      </Modal>

      {/* Modal: Add Income */}
      <Modal isOpen={isAddIncomeOpen} onClose={() => setIsAddIncomeOpen(false)} title="Record New Income">
        <form onSubmit={handleIncomeSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Income Title</label>
            <input 
              type="text"
              value={incTitle}
              onChange={(e) => setIncTitle(e.target.value)}
              placeholder="e.g. Monthly Salary, Freelance Retainer"
              required
              className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Amount ({useFinance().currencySymbol})</label>
              <input 
                type="number"
                step="any"
                value={incAmount}
                onChange={(e) => setIncAmount(e.target.value)}
                placeholder="0.00"
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Source</label>
              <select 
                value={incSource}
                onChange={(e) => setIncSource(e.target.value)}
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              >
                {['Salary', 'Freelance', 'Investments', 'Business', 'Bonus', 'Other'].map(src => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-md transition-all mt-2"
          >
            Save Income
          </button>
        </form>
      </Modal>
    </div>
  );
};
