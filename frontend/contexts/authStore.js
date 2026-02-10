import { create } from 'zustand';
import { authAPI } from '../lib/types';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  // Initialize auth from localStorage
  initAuth: async () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true
      });
      
      try {
        const response = await authAPI.verify();
        set({
          user: response.data.user,
          isAuthenticated: true
        });
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
          token: null,
          user: null,
          isAuthenticated: false
        });
      }
    }
  },

  // Register
  register: async (data) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.register(data);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  // Login
  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.login(data);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  },

  // Update profile
  updateProfile: async (data) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.updateProfile(data);
      set({
        user: response.data.user,
        isLoading: false
      });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.message || 'Update failed'
      };
    }
  }
}));
