'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
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
    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8faff' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1447d4] mb-4 shadow-lg shadow-blue-700/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0f172a] font-figtree">Admin Panel</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to manage content</p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-900/8 border border-slate-100">
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0f172a] focus:outline-none focus:border-[#1447d4] transition-colors"
            />
          </div>
          {error && <p className="text-red-500 text-xs mb-4 font-medium">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1447d4] hover:bg-[#0d3ab8] text-white font-black text-sm uppercase tracking-widest py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
