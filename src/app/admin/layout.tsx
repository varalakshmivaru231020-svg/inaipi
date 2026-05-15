'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { label: 'Dashboard',    href: '/admin',               icon: '▦' },
  { label: 'Blog Posts',   href: '/admin/blogs',         icon: '✎' },
  { label: 'Testimonials', href: '/admin/testimonials',  icon: '❝' },
  { label: 'Section Images', href: '/admin/site-images', icon: '🖼' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [open, setOpen] = useState(false);

  if (pathname === '/admin/login') return <>{children}</>;

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#f8faff' }}>
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[#0f172a] flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-white font-black text-lg tracking-tight font-figtree">inaipi</p>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(n => {
            const active = pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href));
            return (
              <Link key={n.href} href={n.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  active ? 'bg-[#1447d4] text-white' : 'text-white/50 hover:text-white hover:bg-white/8'
                }`}>
                <span className="text-base">{n.icon}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/50 hover:text-white hover:bg-white/8 transition-colors">
            <span>⎋</span> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            {NAV.find(n => n.href === pathname || (n.href !== '/admin' && pathname.startsWith(n.href)))?.label ?? 'Admin'}
          </p>
          <Link href="/" target="_blank" className="text-xs font-bold text-[#1447d4] hover:underline">
            View Site ↗
          </Link>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
