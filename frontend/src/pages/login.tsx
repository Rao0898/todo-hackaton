"use client";

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react'; // Import useSession
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession(); // Use useSession to check authentication status

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/todos');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    setLoading(false);

    if (result?.ok) {
      router.push('/todos');
    } else {
      alert(result?.error || 'Login failed');
    }
  };

  // Show loading state if session is still loading
  if (status === 'loading') {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
        <div className="text-xl">Loading session...</div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen text-white font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-[420px] p-10 space-y-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-white/70">Sign in to continue to your todos.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 w-full px-4 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-white placeholder-white/50"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 w-full px-4 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-white placeholder-white/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 font-semibold text-white bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 active:scale-95 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-sm text-center text-white/70">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </main>
  );
};

export default LoginPage;