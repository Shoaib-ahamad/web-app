'use client';

import Link from 'next/link';
import { Navbar } from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="bg-gradient-to-b from-blue-50 to-white">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
              TaskApp
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A scalable web application with secure authentication and intelligent task management
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              title="Secure Authentication"
              description="JWT-based authentication with bcrypt password hashing"
            />
            <FeatureCard
              title="Task Management"
              description="Create, update, and manage tasks with priorities and due dates"
            />
            <FeatureCard
              title="Advanced Filtering"
              description="Search and filter tasks by status, priority, and custom tags"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
