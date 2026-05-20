import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login status on load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('pos_token');
      if (token) {
        try {
          const data = await authService.getMe();
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem('pos_token');
          }
        } catch (error) {
          console.error('[AuthContext] Session verification failed:', error.message);
          localStorage.removeItem('pos_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      if (data.success && data.token) {
        localStorage.setItem('pos_token', data.token);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: 'Authentication failed.' };
    } catch (error) {
      console.error('[AuthContext] Login failed:', error);
      const errMsg = error.response?.data?.error?.message || error.message || 'Login failed.';
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, displayName) => {
    setLoading(true);
    try {
      const data = await authService.register(email, password, displayName);
      if (data.success && data.token) {
        localStorage.setItem('pos_token', data.token);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: 'Registration failed.' };
    } catch (error) {
      console.error('[AuthContext] Registration failed:', error);
      const errMsg = error.response?.data?.error?.message || error.message || 'Registration failed.';
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn('[AuthContext] Logout endpoint call failed:', error);
    } finally {
      localStorage.removeItem('pos_token');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
