import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  BarChart3, 
  PiggyBank, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Savings', path: '/savings', icon: PiggyBank },
    { name: 'Reminders', path: '/reminders', icon: Bell },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#18352C] border-r border-[#8A6A4A]/30 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#8A6A4A]/30">
            <NavLink to="/dashboard" className="group">
              <Logo size="md" variant="full" darkText={false} />
            </NavLink>
            <button 
              onClick={onClose} 
              className="lg:hidden text-[#DDE3D8] hover:text-[#F4F1E8] p-1 rounded-lg hover:bg-[#8A6A4A]/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) => `
                    flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-[#8A6A4A] text-[#F4F1E8] border border-[#B69A6A]/50 shadow-md font-semibold' 
                      : 'text-[#DDE3D8]/90 hover:text-[#F4F1E8] hover:bg-[#8A6A4A]/30'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-[#8A6A4A]/30 bg-[#18352C]">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#8A6A4A]/20 border border-[#8A6A4A]/30 mb-3">
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
              alt={user?.name || 'User'} 
              className="w-10 h-10 rounded-full object-cover border border-[#B69A6A]"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#F4F1E8] truncate">{user?.name || 'Sneha Mishra'}</p>
              <p className="text-xs text-[#DDE3D8]/80 truncate">{user?.email || 'sneha@vsave.app'}</p>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#8A6A4A]/50 text-sm font-medium text-[#DDE3D8] hover:text-[#F4F1E8] hover:bg-[#8A6A4A] hover:border-[#8A6A4A] transition-all duration-200"
          >
            <LogOut className="w-4 h-4 text-[#B69A6A]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
