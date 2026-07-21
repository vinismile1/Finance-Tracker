import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Pencil, 
  Trash2, 
  Filter,
  Check
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { Modal } from '../components/Modal';

export const RemindersPage = () => {
  const { reminders, addReminder, editReminder, toggleReminderPaid, deleteReminder, formatAmount, currencySymbol } = useFinance();

  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeReminder, setActiveReminder] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Bills');
  const [recurring, setRecurring] = useState('Monthly');
  const [notes, setNotes] = useState('');

  const openAddModal = () => {
    setActiveReminder(null);
    setTitle('');
    setAmount('');
    setDueDate('');
    setCategory('Bills');
    setRecurring('Monthly');
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (rem) => {
    setActiveReminder(rem);
    setTitle(rem.title);
    setAmount(rem.amount);
    setDueDate(rem.dueDate);
    setCategory(rem.category);
    setRecurring(rem.recurring);
    setNotes(rem.notes || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !dueDate) return;

    if (activeReminder) {
      editReminder(activeReminder.id, {
        title,
        amount,
        dueDate,
        category,
        recurring,
        notes
      });
    } else {
      addReminder({
        title,
        amount,
        dueDate,
        category,
        recurring,
        notes
      });
    }

    setIsModalOpen(false);
  };

  const filteredReminders = reminders.filter(rem => {
    if (filterStatus === 'All') return true;
    return rem.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Overdue':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-900 border border-red-300 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Overdue</span>;
      case 'Due Soon':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-700" /> Due Soon</span>;
      case 'Paid':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Paid</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#F4F1E8] text-[#18352C] border border-[#18352C]/20 flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#18352C]" /> Upcoming</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#DDE3D8] border border-[#18352C]/20 p-6 rounded-3xl shadow-cream">
        <div>
          <h2 className="text-2xl font-bold font-['Playfair_Display'] text-[#1D2722]">Payment Reminders & Schedule</h2>
          <p className="text-xs text-[#18352C]/70">
            Stay ahead of rent, utilities, subscriptions, and recurring obligations without late fees.
          </p>
        </div>

        <button 
          onClick={openAddModal}
          className="px-5 py-3 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-105 shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Filter Status Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Due Soon', 'Overdue', 'Upcoming', 'Paid'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === status 
                ? 'bg-[#18352C] text-[#F4F1E8] shadow-md' 
                : 'bg-[#DDE3D8] border border-[#18352C]/20 text-[#18352C]/80 hover:text-[#1D2722]'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Reminders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReminders.length === 0 ? (
          <div className="md:col-span-2 bg-[#DDE3D8] p-12 rounded-3xl border border-[#18352C]/20 text-center">
            <Bell className="w-12 h-12 text-[#18352C]/40 mx-auto mb-3" />
            <p className="text-base font-semibold text-[#1D2722]">No reminders match your filter</p>
            <p className="text-xs text-[#18352C]/70 mt-1">Add a new payment reminder to keep your schedules synchronized.</p>
          </div>
        ) : (
          filteredReminders.map((rem) => (
            <div 
              key={rem.id}
              className={`bg-[#DDE3D8] border rounded-3xl p-6 shadow-cream flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                rem.status === 'Overdue' ? 'border-red-400 bg-red-50/20' :
                rem.status === 'Due Soon' ? 'border-[#B69A6A]' : 'border-[#18352C]/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-[#F4F1E8] border border-[#18352C]/20 text-xs font-semibold text-[#18352C]">
                    {rem.category} • {rem.recurring}
                  </span>
                  {getStatusBadge(rem.status)}
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-['Playfair_Display'] text-[#1D2722]">{rem.title}</h3>
                  <span className="text-xl font-bold font-['Cinzel'] text-[#18352C] shrink-0 ml-3">
                    {formatAmount(rem.amount)}
                  </span>
                </div>

                <p className="text-xs text-[#18352C]/70 flex items-center gap-1 mb-4">
                  <Calendar className="w-3.5 h-3.5 text-[#18352C]" /> Due Date: <span className="font-semibold text-[#1D2722]">{rem.dueDate}</span>
                </p>

                {rem.notes && (
                  <p className="text-xs text-[#18352C]/70 bg-[#F4F1E8] p-2.5 rounded-xl border border-[#18352C]/20 mb-6">
                    {rem.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#18352C]/20">
                <button 
                  onClick={() => toggleReminderPaid(rem.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    rem.status === 'Paid'
                      ? 'bg-[#F4F1E8] text-[#18352C]/70 border border-[#18352C]/20'
                      : 'bg-[#18352C] text-[#F4F1E8] hover:bg-[#8A6A4A] shadow-md'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{rem.status === 'Paid' ? 'Mark Unpaid' : 'Mark as Paid'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => openEditModal(rem)}
                    className="p-2 rounded-xl bg-[#F4F1E8] border border-[#18352C]/20 text-[#18352C]/70 hover:text-[#18352C] hover:border-[#18352C] transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteReminder(rem.id)}
                    className="p-2 rounded-xl bg-[#F4F1E8] border border-[#18352C]/20 text-[#18352C]/70 hover:text-red-600 hover:border-red-600 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reminder Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={activeReminder ? "Edit Payment Reminder" : "Add Payment Reminder"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Obligation Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Monthly Rent, Electricity Bill, Fiber Net"
              required
              className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Amount ({currencySymbol})</label>
              <input 
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="2500"
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Due Date</label>
              <input 
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              >
                {['Rent', 'Bills', 'Insurance', 'Loan', 'Subscription', 'Tax', 'Other'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Recurring Frequency</label>
              <select 
                value={recurring}
                onChange={(e) => setRecurring(e.target.value)}
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              >
                {['Monthly', 'Yearly', 'Weekly', 'One-time'].map(freq => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Notes / Instructions</label>
            <input 
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Account number or payment link"
              className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-md transition-all mt-2"
          >
            {activeReminder ? "Update Reminder" : "Save Reminder"}
          </button>
        </form>
      </Modal>
    </div>
  );
};
