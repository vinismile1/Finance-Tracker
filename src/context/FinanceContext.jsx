import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

const initialExpenses = [
  { id: 'exp_1', title: 'Artisanal Coffee & Breakfast', amount: 450, category: 'Food', date: '2026-07-21', paymentMethod: 'UPI', description: 'Espresso lounge meeting' },
  { id: 'exp_2', title: 'Monthly Apartment Rent', amount: 28000, category: 'Rent', date: '2026-07-01', paymentMethod: 'Bank Transfer', description: 'July rent payment' },
  { id: 'exp_3', title: 'Groceries & Household Supplies', amount: 4200, category: 'Food', date: '2026-07-18', paymentMethod: 'Credit Card', description: 'Organic supermarket' },
  { id: 'exp_4', title: 'Electricity & Utility Bill', amount: 2150, category: 'Bills', date: '2026-07-12', paymentMethod: 'UPI', description: 'State power board' },
  { id: 'exp_5', title: 'Fuel & Highway Tolls', amount: 3500, category: 'Transportation', date: '2026-07-15', paymentMethod: 'Debit Card', description: 'Weekly refill' },
  { id: 'exp_6', title: 'Premium Streaming & Music', amount: 999, category: 'Entertainment', date: '2026-07-05', paymentMethod: 'Credit Card', description: 'Auto-renewal' },
  { id: 'exp_7', title: 'High-Speed Fiber Internet', amount: 1499, category: 'Bills', date: '2026-07-10', paymentMethod: 'UPI', description: 'Monthly subscription' },
  { id: 'exp_8', title: 'Annual Health Checkup', amount: 3200, category: 'Healthcare', date: '2026-07-08', paymentMethod: 'Credit Card', description: 'Diagnostics center' }
];

const initialIncomes = [
  { id: 'inc_1', title: 'Primary Salary', amount: 95000, source: 'Salary', date: '2026-07-01', description: 'Monthly corporate salary' },
  { id: 'inc_2', title: 'Freelance Design Retainer', amount: 22000, source: 'Freelance', date: '2026-07-10', description: 'UX Consulting' },
  { id: 'inc_3', title: 'Investment Dividend', amount: 4500, source: 'Investments', date: '2026-07-15', description: 'Mutual fund yield' }
];

const initialSavingsGoals = [
  { id: 'goal_1', name: 'Emergency Fund', targetAmount: 200000, currentAmount: 145000, targetDate: '2026-12-31', category: 'Emergency' },
  { id: 'goal_2', name: 'New M3 MacBook Pro', targetAmount: 220000, currentAmount: 180000, targetDate: '2026-10-15', category: 'Gadget' },
  { id: 'goal_3', name: 'Italian Espresso Lounge Tour', targetAmount: 150000, currentAmount: 65000, targetDate: '2027-03-31', category: 'Travel' }
];

const initialReminders = [
  { id: 'rem_1', title: 'Apartment Rent Due', amount: 28000, dueDate: '2026-08-01', category: 'Rent', recurring: 'Monthly', status: 'Upcoming', notes: 'Transfer to landlord account' },
  { id: 'rem_2', title: 'Credit Card Bill Clearance', amount: 12450, dueDate: '2026-07-22', category: 'Bills', recurring: 'Monthly', status: 'Due Soon', notes: 'Pay before 11 PM' },
  { id: 'rem_3', title: 'Car Insurance Renewal', amount: 18500, dueDate: '2026-07-28', category: 'Insurance', recurring: 'Yearly', status: 'Upcoming', notes: 'Comprehensive policy' },
  { id: 'rem_4', title: 'Health Insurance Premium', amount: 8200, dueDate: '2026-07-19', category: 'Insurance', recurring: 'Yearly', status: 'Overdue', notes: 'Grace period ends soon' }
];

export const FinanceProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => localStorage.getItem('vsave_currency') || 'INR');
  const [currencySymbol, setCurrencySymbol] = useState(() => localStorage.getItem('vsave_currency_symbol') || '₹');
  const [dateFormat, setDateFormat] = useState(() => localStorage.getItem('vsave_date_format') || 'YYYY-MM-DD');

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('vsave_expenses_v2');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [incomes, setIncomes] = useState(() => {
    const saved = localStorage.getItem('vsave_incomes_v2');
    return saved ? JSON.parse(saved) : initialIncomes;
  });

  const [savingsGoals, setSavingsGoals] = useState(() => {
    const saved = localStorage.getItem('vsave_savings_v2');
    return saved ? JSON.parse(saved) : initialSavingsGoals;
  });

  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('vsave_reminders_v2');
    return saved ? JSON.parse(saved) : initialReminders;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('vsave_expenses_v2', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('vsave_incomes_v2', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('vsave_savings_v2', JSON.stringify(savingsGoals));
  }, [savingsGoals]);

  useEffect(() => {
    localStorage.setItem('vsave_reminders_v2', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('vsave_currency', currency);
    localStorage.setItem('vsave_currency_symbol', currencySymbol);
  }, [currency, currencySymbol]);

  // Expense Actions
  const addExpense = (expenseData) => {
    const newExpense = {
      id: 'exp_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...expenseData,
      amount: Number(expenseData.amount)
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const editExpense = (id, updatedData) => {
    setExpenses(prev => prev.map(item => item.id === id ? { ...item, ...updatedData, amount: Number(updatedData.amount) } : item));
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  // Income Actions
  const addIncome = (incomeData) => {
    const newIncome = {
      id: 'inc_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...incomeData,
      amount: Number(incomeData.amount)
    };
    setIncomes(prev => [newIncome, ...prev]);
  };

  const deleteIncome = (id) => {
    setIncomes(prev => prev.filter(item => item.id !== id));
  };

  // Savings Actions
  const addSavingsGoal = (goalData) => {
    const newGoal = {
      id: 'goal_' + Date.now(),
      currentAmount: Number(goalData.currentAmount || 0),
      targetAmount: Number(goalData.targetAmount),
      ...goalData
    };
    setSavingsGoals(prev => [...prev, newGoal]);
  };

  const editSavingsGoal = (id, updatedData) => {
    setSavingsGoals(prev => prev.map(goal => goal.id === id ? {
      ...goal,
      ...updatedData,
      targetAmount: Number(updatedData.targetAmount),
      currentAmount: Number(updatedData.currentAmount)
    } : goal));
  };

  const depositToGoal = (id, depositAmount) => {
    setSavingsGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        return { ...goal, currentAmount: goal.currentAmount + Number(depositAmount) };
      }
      return goal;
    }));
  };

  const deleteSavingsGoal = (id) => {
    setSavingsGoals(prev => prev.filter(goal => goal.id !== id));
  };

  // Reminder Actions
  const addReminder = (reminderData) => {
    const newReminder = {
      id: 'rem_' + Date.now(),
      status: 'Upcoming',
      ...reminderData,
      amount: Number(reminderData.amount)
    };
    setReminders(prev => [newReminder, ...prev]);
  };

  const editReminder = (id, updatedData) => {
    setReminders(prev => prev.map(rem => rem.id === id ? { ...rem, ...updatedData, amount: Number(updatedData.amount) } : rem));
  };

  const toggleReminderPaid = (id) => {
    setReminders(prev => prev.map(rem => {
      if (rem.id === id) {
        const nextStatus = rem.status === 'Paid' ? 'Upcoming' : 'Paid';
        return { ...rem, status: nextStatus };
      }
      return rem;
    }));
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(rem => rem.id !== id));
  };

  // Currency Updater
  const changeCurrency = (code, symbol) => {
    setCurrency(code);
    setCurrencySymbol(symbol);
  };

  // Calculated Totals
  const totalIncome = incomes.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalSavedInGoals = savingsGoals.reduce((sum, item) => sum + Number(item.currentAmount), 0);
  const totalBalance = totalIncome - totalExpenses;

  const formatAmount = (val) => {
    return `${currencySymbol}${Number(val || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  return (
    <FinanceContext.Provider value={{
      expenses,
      incomes,
      savingsGoals,
      reminders,
      currency,
      currencySymbol,
      dateFormat,
      setDateFormat,
      changeCurrency,
      addExpense,
      editExpense,
      deleteExpense,
      addIncome,
      deleteIncome,
      addSavingsGoal,
      editSavingsGoal,
      depositToGoal,
      deleteSavingsGoal,
      addReminder,
      editReminder,
      toggleReminderPaid,
      deleteReminder,
      totalIncome,
      totalExpenses,
      totalSavedInGoals,
      totalBalance,
      formatAmount
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
