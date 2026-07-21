'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) router.push('/admin');
    else setError('Invalid password. Please try again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f7f9fc] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(20,71,212,0.08) 0%, transparent 70%)' }}
      />
      <div className="w-full max-w-sm relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1447d4] mb-4 shadow-lg shadow-blue-700/30">
            <Lock className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-figtree">Admin Panel</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to manage your content</p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-900/5 border border-slate-200/70">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            autoFocus
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#1447d4] focus:ring-4 focus:ring-[#1447d4]/10 transition-all"
          />
          {error && <p className="text-rose-500 text-xs mt-3 font-medium">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 bg-[#1447d4] hover:bg-[#0d3ab8] text-white font-bold text-sm py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
