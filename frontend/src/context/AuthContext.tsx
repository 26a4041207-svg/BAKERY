'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { api } from '@/services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (username: string, pass: string) => Promise<void>;
  register: (data: { username: string; fullName: string; email: string; password: string; phoneNumber?: string; address?: string }) => Promise<void>;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  openAuthModal: (defaultTab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  setAuthModalTab: (tab: 'login' | 'register') => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthModalOpen: false,
  authModalTab: 'login',
  openAuthModal: () => {},
  closeAuthModal: () => {},
  setAuthModalTab: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const openAuthModal = (defaultTab: 'login' | 'register' = 'login') => {
    setAuthModalTab(defaultTab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('bakery_token');
    const savedUser = localStorage.getItem('bakery_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('bakery_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, pass: string) => {
    const result = await api.login(username, pass);
    setToken(result.token);
    setUser(result.user);
    localStorage.setItem('bakery_token', result.token);
    localStorage.setItem('bakery_user', JSON.stringify(result.user));
  };

  const register = async (data: { username: string; fullName: string; email: string; password: string; phoneNumber?: string; address?: string }) => {
    const result = await api.register(data);
    setToken(result.token);
    setUser(result.user);
    localStorage.setItem('bakery_token', result.token);
    localStorage.setItem('bakery_user', JSON.stringify(result.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('bakery_token');
    localStorage.removeItem('bakery_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        setAuthModalTab
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
