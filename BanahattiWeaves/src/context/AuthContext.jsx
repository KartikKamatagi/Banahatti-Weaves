import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('bw_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [returnUrl, setReturnUrl] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bw_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('bw_user');
    }
  }, [currentUser]);

  const login = async (email, password) => {
    try {
      const res = await apiService.login(email, password);
      setCurrentUser(res.user);
      return { success: true, user: res.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const loginAsAdmin = () => {
    const adminUser = {
      id: 'admin-1',
      name: 'Store Administrator',
      email: 'admin@banahattiweaves.com',
      phone: '+91 99000 11223',
      role: 'ADMIN'
    };
    setCurrentUser(adminUser);
    return { success: true, user: adminUser };
  };

  const register = async (userData) => {
    try {
      const res = await apiService.register(userData);
      setCurrentUser(res.user);
      return { success: true, user: res.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setReturnUrl(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      isAdmin: currentUser?.role === 'ADMIN',
      login,
      loginAsAdmin,
      register,
      logout,
      returnUrl,
      setReturnUrl
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
