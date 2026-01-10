"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  // FINAL FIX: Direct Backend URL
  const API_URL = "https://todo-hackaton-webapp.onrender.com";

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/todos');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Yahan humne process.env hata kar direct API_URL use kiya hai
      const response = await fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('Signup successful! Please log in.');
        router.push('/login');
      } else {
        const errorData = await response.json();
        alert(errorData.detail || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please check your internet or wait for the backend to wake up.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
        <div className="text-xl">Loading session...</div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen text-white font-sans bg-gradient-to-br from-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-[420px] p-10 space-y-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
          <p className="text-white/70">Join to start managing your todos.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-center text-white/70">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
            Log In
          </Link>
        </p>
      </motion.div>
    </main>
  );
};

export default SignupPage;