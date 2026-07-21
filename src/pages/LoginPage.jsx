import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please provide both email address and password.');
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        setSuccess('Authentication successful! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      } else {
        setError(result.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] flex items-center justify-center p-4 selection:bg-[#B69A6A] selection:text-[#18352C]">
      <div className="w-full max-w-md bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#B69A6A] rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/" className="inline-block mb-3 group">
            <Logo size="lg" variant="full" darkText={true} />
          </Link>
          <h2 className="text-xl font-bold font-['Playfair_Display'] text-[#1D2722]">Sign in to your account</h2>
          <p className="text-xs text-[#18352C]/70 mt-1">Enter your credentials to access your financial dashboard</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-100 border border-red-300 text-red-900 text-xs flex items-center gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18352C]/80 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-[#18352C]/60 absolute left-3.5 top-3" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sneha@vsave.app"
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl pl-11 pr-4 py-3 text-sm text-[#1D2722] placeholder-[#18352C]/50 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#18352C]/80">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-[#18352C]/60 absolute left-3.5 top-3" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl pl-11 pr-4 py-3 text-sm text-[#1D2722] placeholder-[#18352C]/50 outline-none transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Quick Fill */}
        <div className="mt-6 pt-4 border-t border-[#18352C]/20 text-center">
          <p className="text-xs text-[#18352C]/70 mb-2">Want a quick demo login?</p>
          <button 
            type="button"
            onClick={() => { setEmail('sneha@vsave.app'); setPassword('password123'); }}
            className="text-xs text-[#18352C] hover:underline font-bold"
          >
            Auto-fill Demo Credentials
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-[#18352C]/70">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#18352C] font-bold hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};
