import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const TOKEN_KEY = 'kosha_token';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and verify existing session on boot
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await authService.getMe();
        if (isMounted && response?.data?.user) {
          setUser(response.data.user);
          setToken(storedToken);
        }
      } catch (error) {
        // Invalid or expired token; clean up storage
        console.warn('[Auth] Session initialization failed, resetting token:', error.message);
        localStorage.removeItem(TOKEN_KEY);
        if (isMounted) {
          setUser(null);
          setToken(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Log in user with email & password
   */
  const login = useCallback(async (email, password) => {
    const response = await authService.login({ email, password });
    const { token: newToken, user: newUser } = response.data;

    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setUser(newUser);
    return newUser;
  }, []);

  /**
   * Register a new account
   */
  const register = useCallback(async (userData) => {
    const response = await authService.register(userData);
    const { token: newToken, user: newUser } = response.data;

    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setUser(newUser);
    return newUser;
  }, []);

  /**
   * Update profile and sync new state/token
   */
  const updateProfile = useCallback(async (data) => {
    const response = await authService.updateProfile(data);
    const { token: newToken, user: updatedUser } = response.data;

    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
    }
    setUser(updatedUser);
    return updatedUser;
  }, []);

  /**
   * Log out user and clean up credentials
   */
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Ignored
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      setToken(null);
    }
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    isLoading,
    login,
    register,
    updateProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to access authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
