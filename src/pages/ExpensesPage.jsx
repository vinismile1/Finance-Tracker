import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Receipt, 
  Pencil, 
  Trash2, 
  Calendar, 
  CreditCard,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { Modal } from '../components/Modal';

export const ExpensesPage = () => {
  const { expenses, addExpense, editExpense, deleteExpense, formatAmount, currencySymbol } = useFinance();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const categories = ['All', 'Food', 'Shopping', 'Transportation', 'Bills', 'Rent', 'Entertainment', 'Healthcare', 'Education', 'Travel', 'Other'];
  const paymentMethods = ['All', 'UPI', 'Credit Card', 'Debit Card', 'Cash', 'Bank Transfer', 'Other'];

  const openAddModal = () => {
    setEditingExpense(null);
    setTitle('');
    setAmount('');
    setCategory('Food');
    setPaymentMethod('UPI');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (exp) => {
    setEditingExpense(exp);
    setTitle(exp.title);
    setAmount(exp.amount);
    setCategory(exp.category);
    setPaymentMethod(exp.paymentMethod);
    setDate(exp.date);
    setDescription(exp.description || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    if (editingExpense) {
      editExpense(editingExpense.id, {
        title,
        amount: Number(amount),
        category,
        paymentMethod,
        date,
        description
      });
    } else {
      addExpense({
        title,
        amount: Number(amount),
        category,
        paymentMethod,
        date,
        description
      });
    }

    setIsModalOpen(false);
  };

  // Filtered and Sorted Expenses
  const filteredExpenses = useMemo(() => {
    return expenses
      .filter(exp => {
        const matchesSearch = 
          exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (exp.description && exp.description.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = selectedCategory === 'All' || exp.category === selectedCategory;
        const matchesPayment = selectedPayment === 'All' || exp.paymentMethod === selectedPayment;

        return matchesSearch && matchesCategory && matchesPayment;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'amount-desc') return b.amount - a.amount;
        if (sortBy === 'amount-asc') return a.amount - b.amount;
        return 0;
      });
  }, [expenses, searchTerm, selectedCategory, selectedPayment, sortBy]);

  const totalFilteredAmount = filteredExpenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#DDE3D8] border border-[#18352C]/20 p-6 rounded-3xl shadow-cream">
        <div>
          <h2 className="text-2xl font-bold font-['Playfair_Display'] text-[#1D2722]">Expense Records</h2>
          <p className="text-xs text-[#18352C]/70">
            Showing <span className="text-[#18352C] font-semibold">{filteredExpenses.length}</span> entries • Total: <span className="text-[#18352C] font-bold">{formatAmount(totalFilteredAmount)}</span>
          </p>
        </div>

        <button 
          onClick={openAddModal}
          className="px-5 py-3 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-105 shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-[#DDE3D8] border border-[#18352C]/20 p-4 rounded-2xl shadow-cream grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#18352C]/70 absolute left-3 top-3" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transactions..."
            className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1D2722] placeholder-[#18352C]/60 outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 bg-[#F4F1E8] border border-[#18352C]/30 rounded-xl px-3 py-1.5">
          <Filter className="w-4 h-4 text-[#18352C] shrink-0" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-transparent text-xs text-[#1D2722] outline-none cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-[#F4F1E8] text-[#1D2722]">
                Category: {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Filter */}
        <div className="flex items-center gap-2 bg-[#F4F1E8] border border-[#18352C]/30 rounded-xl px-3 py-1.5">
          <CreditCard className="w-4 h-4 text-[#18352C] shrink-0" />
          <select 
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="w-full bg-transparent text-xs text-[#1D2722] outline-none cursor-pointer"
          >
            {paymentMethods.map(pm => (
              <option key={pm} value={pm} className="bg-[#F4F1E8] text-[#1D2722]">
                Payment: {pm}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 bg-[#F4F1E8] border border-[#18352C]/30 rounded-xl px-3 py-1.5">
          <ArrowUpDown className="w-4 h-4 text-[#18352C] shrink-0" />
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-transparent text-xs text-[#1D2722] outline-none cursor-pointer"
          >
            <option value="date-desc" className="bg-[#F4F1E8] text-[#1D2722]">Date: Newest First</option>
            <option value="date-asc" className="bg-[#F4F1E8] text-[#1D2722]">Date: Oldest First</option>
            <option value="amount-desc" className="bg-[#F4F1E8] text-[#1D2722]">Amount: High to Low</option>
            <option value="amount-asc" className="bg-[#F4F1E8] text-[#1D2722]">Amount: Low to High</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl overflow-hidden shadow-cream">
        {filteredExpenses.length === 0 ? (
          <div className="p-12 text-center">
            <Receipt className="w-12 h-12 text-[#18352C]/40 mx-auto mb-3" />
            <p className="text-base font-semibold text-[#1D2722]">No expenses found</p>
            <p className="text-xs text-[#18352C]/70 mt-1">Try adjusting your search criteria or add a new expense.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm text-[#1D2722]">
            <thead>
              <tr className="bg-[#F4F1E8] text-xs uppercase text-[#18352C]/70 border-b border-[#18352C]/20">
                <th className="py-4 px-6 font-semibold">Title / Description</th>
                <th className="py-4 px-4 font-semibold">Category</th>
                <th className="py-4 px-4 font-semibold">Payment</th>
                <th className="py-4 px-4 font-semibold">Date</th>
                <th className="py-4 px-4 font-semibold text-right">Amount</th>
                <th className="py-4 px-6 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18352C]/15">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#F4F1E8] transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-[#1D2722]">{exp.title}</p>
                      {exp.description && <p className="text-xs text-[#18352C]/70">{exp.description}</p>}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-[#F4F1E8] border border-[#18352C]/20 text-xs font-medium text-[#18352C]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-[#18352C]/70">
                    {exp.paymentMethod}
                  </td>
                  <td className="py-4 px-4 text-xs text-[#18352C]/70">
                    {exp.date}
                  </td>
                  <td className="py-4 px-4 text-right font-bold font-['Cinzel'] text-[#18352C]">
                    -{formatAmount(exp.amount)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openEditModal(exp)}
                        className="p-1.5 rounded-lg bg-[#F4F1E8] border border-[#18352C]/20 text-[#18352C]/70 hover:text-[#18352C] hover:border-[#18352C] transition-all"
                        title="Edit Expense"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteExpense(exp.id)}
                        className="p-1.5 rounded-lg bg-[#F4F1E8] border border-[#18352C]/20 text-[#18352C]/70 hover:text-red-600 hover:border-red-600 transition-all"
                        title="Delete Expense"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {filteredExpenses.length === 0 ? (
          <div className="bg-[#DDE3D8] p-8 rounded-2xl border border-[#18352C]/20 text-center">
            <p className="text-sm text-[#18352C]/70">No matching expenses.</p>
          </div>
        ) : (
          filteredExpenses.map((exp) => (
            <div key={exp.id} className="bg-[#DDE3D8] p-4 rounded-2xl border border-[#18352C]/20 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm text-[#1D2722]">{exp.title}</h4>
                  {exp.description && <p className="text-xs text-[#18352C]/70">{exp.description}</p>}
                </div>
                <span className="font-bold font-['Cinzel'] text-[#18352C] text-base">
                  -{formatAmount(exp.amount)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#18352C]/15">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#F4F1E8] border border-[#18352C]/20 text-[#18352C]">
                    {exp.category}
                  </span>
                  <span className="text-[#18352C]/70">{exp.paymentMethod}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#18352C]/70">{exp.date}</span>
                  <button onClick={() => openEditModal(exp)} className="p-1 text-[#18352C]"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteExpense(exp.id)} className="p-1 text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Expense Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingExpense ? "Edit Expense Entry" : "Record New Expense"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Expense Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Artisanal Coffee, Internet Subscription"
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
                placeholder="0.00"
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Date</label>
              <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Payment Method</label>
              <select 
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
              >
                {paymentMethods.filter(pm => pm !== 'All').map(pm => (
                  <option key={pm} value={pm}>{pm}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Notes / Vendor Description</label>
            <input 
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Special roast beans at Cafe"
              className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2.5 text-sm text-[#1D2722] outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-md transition-all mt-2"
          >
            {editingExpense ? "Update Expense Entry" : "Save Expense"}
          </button>
        </form>
      </Modal>
    </div>
  );
};
