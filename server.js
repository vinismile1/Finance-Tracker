import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || 'vsave_espresso_gold_secret_key_2026';
const PORT = process.env.PORT || 3000;

// In-memory Database Store
const usersDb = [
  {
    id: 'usr_demo',
    name: 'Sneha Mishra',
    email: 'sneha@vsave.app',
    passwordHash: bcrypt.hashSync('password123', 10),
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    currency: 'INR',
    createdAt: new Date().toISOString()
  }
];

const expensesDb = [
  { id: 'exp_1', userId: 'usr_demo', title: 'Artisanal Coffee & Breakfast', amount: 450, category: 'Food', date: '2026-07-21', paymentMethod: 'UPI', description: 'Espresso lounge meeting' },
  { id: 'exp_2', userId: 'usr_demo', title: 'Monthly Apartment Rent', amount: 28000, category: 'Rent', date: '2026-07-01', paymentMethod: 'Bank Transfer', description: 'July rent payment' },
  { id: 'exp_3', userId: 'usr_demo', title: 'Groceries & Household Supplies', amount: 4200, category: 'Food', date: '2026-07-18', paymentMethod: 'Credit Card', description: 'Organic supermarket' }
];

const savingsDb = [
  { id: 'goal_1', userId: 'usr_demo', name: 'Emergency Fund', targetAmount: 200000, currentAmount: 145000, targetDate: '2026-12-31', category: 'Emergency' },
  { id: 'goal_2', userId: 'usr_demo', name: 'New M3 MacBook Pro', targetAmount: 220000, currentAmount: 180000, targetDate: '2026-10-15', category: 'Gadget' }
];

const remindersDb = [
  { id: 'rem_1', userId: 'usr_demo', title: 'Apartment Rent Due', amount: 28000, dueDate: '2026-08-01', category: 'Rent', recurring: 'Monthly', status: 'Upcoming', notes: 'Transfer to landlord' },
  { id: 'rem_2', userId: 'usr_demo', title: 'Credit Card Bill Clearance', amount: 12450, dueDate: '2026-07-22', category: 'Bills', recurring: 'Monthly', status: 'Due Soon', notes: 'Pay before 11 PM' }
];

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Auth Middleware
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authentication required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
    });
  };

  // REST API Routes
  // 1. Auth: Register
  app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existing = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      passwordHash,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      currency: 'INR',
      createdAt: new Date().toISOString()
    };

    usersDb.push(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar, currency: newUser.currency }
    });
  });

  // 2. Auth: Login
  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar, currency: user.currency }
    });
  });

  // 3. Expenses API
  app.get('/api/expenses', authenticateToken, (req, res) => {
    const userExpenses = expensesDb.filter(e => e.userId === req.user.id);
    res.json(userExpenses);
  });

  app.post('/api/expenses', authenticateToken, (req, res) => {
    const newExp = {
      id: 'exp_' + Date.now(),
      userId: req.user.id,
      ...req.body
    };
    expensesDb.unshift(newExp);
    res.status(201).json(newExp);
  });

  // 4. Analytics API Summary
  app.get('/api/analytics/summary', authenticateToken, (req, res) => {
    const userExpenses = expensesDb.filter(e => e.userId === req.user.id);
    const totalExp = userExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    res.json({
      totalExpenses: totalExp,
      count: userExpenses.length
    });
  });

  // Frontend SPA Integration
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: 3000 },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
