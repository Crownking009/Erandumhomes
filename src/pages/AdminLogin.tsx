/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth
    if (username === 'admin' && password === 'erandum2024') {
      onLogin();
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col justify-center items-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-12 luxury-shadow border border-secondary"
      >
        <div className="text-center mb-10">
          <div className="mb-8 flex justify-center">
            <Logo size="lg" />
          </div>
          <h2 className="text-3xl font-display font-medium text-primary mb-2">Admin Portal</h2>
          <p className="text-xs uppercase tracking-widest text-muted font-bold">Authorized Personnel Only</p>
          <div className="mt-4 p-3 bg-secondary/50 border border-secondary text-[10px] text-muted italic">
            Dev Tip: Use <span className="font-bold text-accent">admin</span> / <span className="font-bold text-accent">erandum2024</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-secondary/50 border border-secondary p-4 text-sm focus:border-accent outline-none transition-colors"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary/50 border border-secondary p-4 text-sm focus:border-accent outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 p-3 border border-red-100 italic">
              <ShieldAlert size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-4 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 hover:bg-accent transition-all duration-300"
          >
            Authenticate
            <ArrowRight size={16} />
          </button>
        </form>
        
        <div className="mt-8 text-center">
            <p className="text-[10px] text-muted italic">
                Contact system administrator if you've lost access.
            </p>
        </div>
      </motion.div>
    </div>
  );
}
