import React, { createContext, useState, useContext } from 'react';
import type { AuthContextType, User } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (user:User) => {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    const mockUser: User = { id: '1', name: 'Malike Şen', email: user.email || '', password: user.password || ''};
    setUser(mockUser);
  };

  const register = async (user: User) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = { id: '2', name: '', email: user.email || '', password: user.password || ''};
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: user !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
