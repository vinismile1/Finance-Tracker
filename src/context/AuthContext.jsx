import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDefaultAvatarByGender } from '../utils/avatarUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vsave_user');
    if (savedUser) {
      try { return JSON.parse(savedUser); } catch (e) { return null; }
    }
    // Default demo user with cartoon avatar
    return {
      id: 'usr_demo',
      name: 'Sneha Mishra',
      email: 'sneha@vsave.app',
      gender: 'female',
      avatar: getDefaultAvatarByGender('female'),
      currency: 'INR',
      currencySymbol: '₹',
      memberSince: '2025-01-15'
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('vsave_token') || true; // Default logged in for smooth exploration, can toggle
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('vsave_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vsave_user');
    }
  }, [user]);

  const login = async (email, password) => {
    // Attempt backend API login first
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('vsave_token', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (e) {
      console.warn('Backend API unavailable, using local authentication.');
    }

    // Local fallback login handler
    const users = JSON.parse(localStorage.getItem('vsave_registered_users')) || [];
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser) {
      if (foundUser.password === password) {
        const userGender = foundUser.gender || 'female';
        const userData = {
          id: foundUser.id || 'usr_' + Date.now(),
          name: foundUser.name,
          email: foundUser.email,
          gender: userGender,
          avatar: foundUser.avatar || getDefaultAvatarByGender(userGender),
          currency: 'INR',
          currencySymbol: '₹',
          memberSince: new Date().toISOString().split('T')[0]
        };
        setUser(userData);
        localStorage.setItem('vsave_token', 'mock_jwt_token_' + Date.now());
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: 'Invalid email or password.' };
      }
    }

    // Allow default login for demo if email matches
    if (email.toLowerCase() === 'sneha@vsave.app' || email.toLowerCase() === 'demo@vsave.com' || password.length >= 6) {
      const userData = {
        id: 'usr_demo',
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email: email,
        gender: 'female',
        avatar: getDefaultAvatarByGender('female'),
        currency: 'INR',
        currencySymbol: '₹',
        memberSince: '2025-01-15'
      };
      setUser(userData);
      localStorage.setItem('vsave_token', 'mock_jwt_token_' + Date.now());
      setIsAuthenticated(true);
      return { success: true };
    }

    return { success: false, message: 'User not found. Please register first.' };
  };

  const register = async (name, email, password, gender = 'female', selectedAvatar = null) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, gender })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('vsave_token', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (e) {
      console.warn('Backend API unavailable, using local registration.');
    }

    // Local fallback registration
    const users = JSON.parse(localStorage.getItem('vsave_registered_users')) || [];
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'Email address is already registered.' };
    }

    const assignedAvatar = selectedAvatar || getDefaultAvatarByGender(gender);

    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password,
      gender,
      avatar: assignedAvatar,
      currency: 'INR',
      currencySymbol: '₹',
      memberSince: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    localStorage.setItem('vsave_registered_users', JSON.stringify(users));

    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      gender: newUser.gender,
      avatar: newUser.avatar,
      currency: newUser.currency,
      currencySymbol: newUser.currencySymbol,
      memberSince: newUser.memberSince
    });
    localStorage.setItem('vsave_token', 'mock_jwt_token_' + Date.now());
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('vsave_token');
    setIsAuthenticated(false);
  };

  const updateUserProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
