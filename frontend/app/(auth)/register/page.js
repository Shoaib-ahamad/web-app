'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { RegisterForm } from '../../components/RegisterForm';
import { Navbar } from '../../components/Navbar';

export default function RegisterPage() {
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
              Get Started
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Create your account to manage tasks
            </p>

            <RegisterForm onSuccess={() => router.push('/dashboard')} />

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
