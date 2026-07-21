import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { CartoonAvatars, getDefaultAvatarByGender } from '../utils/avatarUtils';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('female');
  const [selectedAvatar, setSelectedAvatar] = useState(getDefaultAvatarByGender('female'));

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleGenderChange = (newGender) => {
    setGender(newGender);
    setSelectedAvatar(getDefaultAvatarByGender(newGender));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const result = await register(name, email, password, gender, selectedAvatar);
      if (result.success) {
        setSuccess('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      } else {
        setError(result.message || 'Registration failed.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const avatarOptions = gender === 'male' ? CartoonAvatars.male : CartoonAvatars.female;

  return (
    <div className="min-h-screen bg-[#F4F1E8] flex items-center justify-center p-4 selection:bg-[#B69A6A] selection:text-[#18352C] my-8">
      <div className="w-full max-w-md bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#B69A6A] rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        {/* Brand Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <Link to="/" className="inline-block mb-3 group">
            <Logo size="lg" variant="full" darkText={true} />
          </Link>
          <h2 className="text-xl font-bold font-['Playfair_Display'] text-[#1D2722]">Create Your V.SAVE Account</h2>
          <p className="text-xs text-[#18352C]/70 mt-1">Join thousands managing their wealth with elegance</p>
        </div>

        {/* Selected Cartoon Character Preview */}
        <div className="mb-6 p-4 rounded-2xl bg-[#F4F1E8] border border-[#18352C]/20 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-[#18352C] bg-white overflow-hidden p-0.5 shrink-0 shadow">
            <img src={selectedAvatar} alt="Cartoon Character" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#18352C] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#18352C]" /> Cartoon Portfolio Picture
            </div>
            <div className="text-xs font-bold text-[#1D2722]">
              {gender === 'female' ? '👩 Female Cartoon Character' : '👨 Male Cartoon Character'}
            </div>
          </div>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18352C]/80 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-[#18352C]/60 absolute left-3.5 top-3" />
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sneha Mishra"
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl pl-11 pr-4 py-2.5 text-sm text-[#1D2722] placeholder-[#18352C]/50 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18352C]/80 mb-1.5">
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
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl pl-11 pr-4 py-2.5 text-sm text-[#1D2722] placeholder-[#18352C]/50 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Gender Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18352C]/80 mb-1.5">
              Select Gender (Auto-assigns Cartoon Character)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleGenderChange('female')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  gender === 'female' 
                    ? 'bg-[#18352C] text-[#F4F1E8] border-[#18352C] shadow' 
                    : 'bg-[#F4F1E8] text-[#18352C]/70 border-[#18352C]/30 hover:border-[#18352C]'
                }`}
              >
                👩 Female
              </button>
              <button
                type="button"
                onClick={() => handleGenderChange('male')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  gender === 'male' 
                    ? 'bg-[#18352C] text-[#F4F1E8] border-[#18352C] shadow' 
                    : 'bg-[#F4F1E8] text-[#18352C]/70 border-[#18352C]/30 hover:border-[#18352C]'
                }`}
              >
                👨 Male
              </button>
            </div>
          </div>

          {/* Quick Cartoon Character Picker */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18352C]/80 mb-1.5">
              Choose Cartoon Character
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {avatarOptions.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => setSelectedAvatar(av.url)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all shrink-0 bg-white p-0.5 ${
                    selectedAvatar === av.url ? 'border-[#18352C] scale-110 shadow-md ring-2 ring-[#18352C]/20' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18352C]/80 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-[#18352C]/60 absolute left-3.5 top-3" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl pl-11 pr-4 py-2.5 text-sm text-[#1D2722] placeholder-[#18352C]/50 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18352C]/80 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-[#18352C]/60 absolute left-3.5 top-3" />
              <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl pl-11 pr-4 py-2.5 text-sm text-[#1D2722] placeholder-[#18352C]/50 outline-none transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'Creating Account...' : 'Register Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#18352C]/70">
          Already have an account?{' '}
          <Link to="/login" className="text-[#18352C] font-bold hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};
