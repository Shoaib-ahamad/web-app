'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LoginForm } from '../../components/LoginForm';
import { Navbar } from '../../components/Navbar';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Sign in to your account to continue
            </p>

            <LoginForm onSuccess={() => router.push('/dashboard')} />

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
