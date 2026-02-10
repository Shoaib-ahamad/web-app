'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../contexts/authStore';

export function useAuth() {
  const store = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    store.initAuth();
  }, []);

  return {
    user: store.user,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    login: store.login,
    register: store.register,
    logout: store.logout,
    updateProfile: store.updateProfile
  };
}

export function useProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  return { isLoading };
}
