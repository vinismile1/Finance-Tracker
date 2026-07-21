import React, { useState } from 'react';
import { User, Mail, ShieldCheck, Key, CheckCircle2, Sparkles, Camera, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFinance } from '../context/FinanceContext';
import { CartoonAvatars, getDefaultAvatarByGender } from '../utils/avatarUtils';

export const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const { currency, currencySymbol } = useFinance();

  const [name, setName] = useState(user?.name || 'Sneha Mishra');
  const [email, setEmail] = useState(user?.email || 'sneha@vsave.app');
  const [gender, setGender] = useState(user?.gender || 'female');
  const [selectedAvatar, setSelectedAvatar] = useState(
    user?.avatar || getDefaultAvatarByGender(user?.gender || 'female')
  );

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profileSuccess, setProfileSuccess] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  const handleGenderChange = (newGender) => {
    setGender(newGender);
    // Auto-suggest cartoon avatar for the selected gender if currently using gender-matched default
    const newDefaultAvatar = getDefaultAvatarByGender(newGender);
    setSelectedAvatar(newDefaultAvatar);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateUserProfile({ name, email, gender, avatar: selectedAvatar });
    setProfileSuccess('Profile details and cartoon character avatar updated!');
    setTimeout(() => setProfileSuccess(''), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPassError('Please fill in all password fields.');
      return;
    }

    if (newPassword.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }

    setPassSuccess('Password updated securely!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPassSuccess(''), 3000);
  };

  const avatarList = gender === 'male' ? CartoonAvatars.male : CartoonAvatars.female;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
      {/* Top Banner Card */}
      <div className="bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 lg:p-8 shadow-cream flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#18352C] shadow-md bg-[#F4F1E8] flex items-center justify-center">
            <img 
              src={selectedAvatar} 
              alt="Cartoon Profile Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#18352C] text-[#B69A6A] p-1.5 rounded-full border border-[#F4F1E8] shadow" title="Cartoon Character Avatar">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1E8] border border-[#18352C]/30 text-[#18352C] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3.5 text-[#18352C]" /> V.SAVE Premium Member
          </div>
          <h2 className="text-2xl font-bold font-['Playfair_Display'] text-[#1D2722]">{name}</h2>
          <p className="text-xs text-[#18352C]/70 mt-0.5">{email}</p>
          <p className="text-xs text-[#18352C] mt-2 font-semibold flex items-center justify-center sm:justify-start gap-2">
            <span>Gender: <strong className="capitalize">{gender}</strong></span>
            <span>•</span>
            <span>Member Since: {user?.memberSince || '2025-01-15'}</span>
            <span>•</span>
            <span>Base Currency: {currency} ({currencySymbol})</span>
          </p>
        </div>
      </div>

      {/* Cartoon Avatar Picker Section */}
      <div className="bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 shadow-cream">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[#18352C]/20">
          <div>
            <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#1D2722] flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#18352C]" />
              Cartoon Character Portfolio Picture
            </h3>
            <p className="text-xs text-[#18352C]/70">Select your preferred cartoon character avatar matching your gender identity</p>
          </div>

          {/* Gender Selector Toggle */}
          <div className="inline-flex p-1 bg-[#F4F1E8] rounded-xl border border-[#18352C]/20 shrink-0">
            <button
              type="button"
              onClick={() => handleGenderChange('female')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                gender === 'female' 
                  ? 'bg-[#18352C] text-[#F4F1E8] shadow-sm' 
                  : 'text-[#18352C]/70 hover:text-[#18352C]'
              }`}
            >
              👩 Female Characters
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('male')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                gender === 'male' 
                  ? 'bg-[#18352C] text-[#F4F1E8] shadow-sm' 
                  : 'text-[#18352C]/70 hover:text-[#18352C]'
              }`}
            >
              👨 Male Characters
            </button>
          </div>
        </div>

        {/* Cartoon Characters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2">
          {avatarList.map((av) => (
            <button
              key={av.id}
              type="button"
              onClick={() => setSelectedAvatar(av.url)}
              className={`p-3 rounded-2xl bg-[#F4F1E8] border transition-all flex flex-col items-center gap-2 text-center group ${
                selectedAvatar === av.url 
                  ? 'border-2 border-[#18352C] ring-2 ring-[#18352C]/20 bg-emerald-50/50 scale-105 shadow-md' 
                  : 'border-[#18352C]/20 hover:border-[#18352C]/60 hover:scale-102'
              }`}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border border-[#18352C]/20 bg-white p-1 shadow-sm">
                <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-bold text-[#1D2722]">{av.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Information Update */}
        <div className="bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 shadow-cream">
          <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#1D2722] mb-4 pb-3 border-b border-[#18352C]/20">
            Account Details
          </h3>

          {profileSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{profileSuccess}</span>
            </div>
          )}

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#18352C]/70 absolute left-3 top-3" />
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#1D2722] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#18352C]/70 absolute left-3 top-3" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#1D2722] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleGenderChange('female')}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                    gender === 'female' 
                      ? 'bg-[#18352C] text-[#F4F1E8] border-[#18352C]' 
                      : 'bg-[#F4F1E8] text-[#18352C]/70 border-[#18352C]/30 hover:border-[#18352C]'
                  }`}
                >
                  👩 Female
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange('male')}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                    gender === 'male' 
                      ? 'bg-[#18352C] text-[#F4F1E8] border-[#18352C]' 
                      : 'bg-[#F4F1E8] text-[#18352C]/70 border-[#18352C]/30 hover:border-[#18352C]'
                  }`}
                >
                  👨 Male
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-md transition-all mt-2"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-[#DDE3D8] border border-[#18352C]/20 rounded-3xl p-6 shadow-cream">
          <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#1D2722] mb-4 pb-3 border-b border-[#18352C]/20">
            Security & Credentials
          </h3>

          {passError && (
            <div className="mb-4 p-3 rounded-xl bg-red-100 border border-red-300 text-red-900 text-xs">
              {passError}
            </div>
          )}

          {passSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{passSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Current Password</label>
              <input 
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2 text-sm text-[#1D2722] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">New Password</label>
              <input 
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2 text-sm text-[#1D2722] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#18352C]/70 mb-1">Confirm New Password</label>
              <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-[#F4F1E8] border border-[#18352C]/30 focus:border-[#B69A6A] rounded-xl px-4 py-2 text-sm text-[#1D2722] outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-[#F4F1E8] border border-[#18352C]/30 hover:border-[#18352C] text-[#18352C] font-bold text-sm transition-all mt-2"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
