import React, { useState } from 'react';
import { 
  PiggyBank, 
  Plus, 
  Target, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Pencil, 
  Trash2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { Modal } from '../components/Modal';

export const SavingsPage = () => {
  const { savingsGoals, totalSavedInGoals, addSavingsGoal, editSavingsGoal, depositToGoal, deleteSavingsGoal, formatAmount, currencySymbol } = useFinance();

  // Modals state
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [activeGoal, setActiveGoal] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [category, setCategory] = useState('Emergency');

  // Deposit Form State
  const [depositVal, setDepositVal] = useState('');

  const openAddModal = () => {
    setActiveGoal(null);
    setName('');
    setTargetAmount('');
    setCurrentAmount('');
    setTargetDate('');
    setCategory('Emergency');
    setIsGoalModalOpen(true);
  };

  const openEditModal = (goal) => {
    setActiveGoal(goal);
    setName(goal.name);
    setTargetAmount(goal.targetAmount);
    setCurrentAmount(goal.currentAmount);
    setTargetDate(goal.targetDate);
    setCategory(goal.category || 'General');
    setIsGoalModalOpen(true);
  };

  const openDepositModal = (goal) => {
    setActiveGoal(goal);
    setDepositVal('');
    setIsDepositModalOpen(true);
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetAmount) return;

    if (activeGoal) {
      editSavingsGoal(activeGoal.id, {
        name,
        targetAmount,
        currentAmount: currentAmount || 0,
        targetDate,
        category
      });
    } else {
      addSavingsGoal({
        name,
        targetAmount,
        currentAmount: currentAmount || 0,
        targetDate,
        category
      });
    }

    setIsGoalModalOpen(false);
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (!activeGoal || !depositVal) return;
    depositToGoal(activeGoal.id, depositVal);
    setIsDepositModalOpen(false);
  };

  const totalTargetInGoals = savingsGoals.reduce((sum, g) => sum + Number(g.targetAmount), 0);
  const overallProgressPct = totalTargetInGoals > 0 ? Math.min(100, Math.round((totalSavedInGoals / totalTargetInGoals) * 100)) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Summary Banner */}
      <div className="bg-[#DDE3D8] p-6 lg:p-8 rounded-3xl border border-[#18352C]/20 shadow-cream flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1E8] border border-[#18352C]/30 text-[#18352C] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3.5 text-[#18352C]" />
            Wealth Accumulation
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display'] text-[#1D2722]">
            Savings & Financial Goals
          </h2>
          <p className="text-xs text-[#18352C]/70 mt-1">
            Build funds for emergencies, major life purchases, and future travel with dedicated progress tracking.
          </p>
        </div>

        <button 
          onClick={openAddModal}
          className="px-5 py-3 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-105 shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Create Goal</span>
        </button>
      </div>

      {/* Global Savings Progress Bar Card */}
      <div className="bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 shadow-cream">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#18352C]/70">Combined Savings Velocity</span>
            <h3 className="text-2xl font-bold font-['Cinzel'] text-[#1D2722] mt-1">
              {formatAmount(totalSavedInGoals)} <span className="text-xs font-normal text-[#18352C]/70">/ {formatAmount(totalTargetInGoals)} Target</span>
            </h3>
          </div>
          <span className="text-xl font-bold font-['Cinzel'] text-[#18352C]">
            {overallProgressPct}%
          </span>
        </div>

        {/* Outer Bar */}
        <div className="w-full bg-[#F4F1E8] h-4 rounded-full overflow-hidden border border-[#18352C]/20 p-0.5">
          <div 
            className="bg-gradient-to-r from-[#18352C] via-[#8A6A4A] to-[#B69A6A] h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${overallProgressPct}%` }}
          />
        </div>
      </div>

      {/* Goals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const isCompleted = goal.currentAmount >= goal.targetAmount;

          return (
            <div 
              key={goal.id} 
              className="bg-[#DDE3D8] border border-[#18352C]/20 hover:border-[#18352C] rounded-3xl p-6 shadow-cream flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-[#F4F1E8] border border-[#18352C]/20 text-xs font-semibold text-[#18352C]">
                    {goal.category || 'General'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => openEditModal(goal)}
                      className="p-1.5 rounded-lg text-[#18352C]/70 hover:text-[#18352C] hover:bg-[#F4F1E8] transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteSavingsGoal(goal.id)}
                      className="p-1.5 rounded-lg text-[#18352C]/70 hover:text-red-600 hover:bg-[#F4F1E8] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-['Playfair_Display'] text-[#1D2722] mb-1">{goal.name}</h3>
                <p className="text-xs text-[#18352C]/70 flex items-center gap-1 mb-6">
                  <Calendar className="w-3.5 h-3.5 text-[#18352C]" /> Target Date: {goal.targetDate || 'Not set'}
                </p>

                {/* Amounts & Percentage */}
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xl font-bold font-['Cinzel'] text-[#18352C]">
                    {formatAmount(goal.currentAmount)}
                  </span>
                  <span className="text-xs text-[#18352C]/70">
                    Goal: {formatAmount(goal.targetAmount)}
                  </span>
                </div>

                {/* Individual Progress Bar */}
                <div className="w-full bg-[#F4F1E8] h-3 rounded-full overflow-hidden border border-[#18352C]/20 mb-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-600' : 'bg-[#18352C]'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-[#18352C] block text-right mb-6">
                  {pct}% Completed
                </span>
              </div>

              <button 
                onClick={() => openDepositModal(goal)}
                className="w-full py-2.5 rounded-xl bg-[#F4F1E8] border border-[#18352C]/20 hover:border-[#18352C] text-[#1D2722] font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:bg-[#18352C] hover:text-[#F4F1E8]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Funds to Goal</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Goal Modal (Add / Edit) */}
      <Modal 
        isOpen={isGoalModalOpen} 
        onClose={() => setIsGoalModalOpen(false)} 
        title={activeGoal ? "Edit Savings Goal" : "Create New Savings Goal"}
      >
        <form onSubmit={handleGoalSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Goal Name</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Emergency Fund, New Laptop, Vacation"
              required
              className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Target Amount ({currencySymbol})</label>
              <input 
                type="number"
                step="any"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="100000"
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Current Saved ({currencySymbol})</label>
              <input 
                type="number"
                step="any"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                placeholder="0"
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
                {['Emergency', 'Gadget', 'Travel', 'Car', 'Education', 'Investment', 'Other'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Target Completion Date</label>
              <input 
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-md transition-all mt-2"
          >
            {activeGoal ? "Update Goal" : "Create Goal"}
          </button>
        </form>
      </Modal>

      {/* Deposit Modal */}
      <Modal 
        isOpen={isDepositModalOpen} 
        onClose={() => setIsDepositModalOpen(false)} 
        title={`Add Funds: ${activeGoal?.name || ''}`}
      >
        <form onSubmit={handleDepositSubmit} className="space-y-4">
          <p className="text-xs text-[#18352C]/70">
            Current Balance: <span className="text-[#18352C] font-bold">{activeGoal && formatAmount(activeGoal.currentAmount)}</span> / Target: {activeGoal && formatAmount(activeGoal.targetAmount)}
          </p>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Deposit Amount ({currencySymbol})</label>
            <input 
              type="number"
              step="any"
              value={depositVal}
              onChange={(e) => setDepositVal(e.target.value)}
              placeholder="e.g. 5000"
              required
              className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-md transition-all mt-2"
          >
            Confirm Deposit
          </button>
        </form>
      </Modal>
    </div>
  );
};
