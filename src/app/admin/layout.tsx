'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, FileText, Briefcase, Quote,
  Search, Image as ImageIcon, LogOut, Menu, X, ExternalLink,
} from 'lucide-react';

const GROUPS = [
  {
    title: 'Content',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
      { label: 'Blog Posts', href: '/admin/blogs', icon: FileText },
      { label: 'Careers', href: '/admin/jobs', icon: Briefcase },
      { label: 'Testimonials', href: '/admin/testimonials', icon: Quote },
    ],
  },
  {
    title: 'Site Settings',
    items: [
      { label: 'SEO', href: '/admin/seo', icon: Search },
      { label: 'Section Images', href: '/admin/site-images', icon: ImageIcon },
    ],
  },
];

const ALL = GROUPS.flatMap(g => g.items);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (pathname === '/admin/login') return <>{children}</>;

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/') || pathname === href;

  const current = ALL.find(n => isActive(n.href, n.exact));

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const Sidebar = (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-full">
      <div className="px-6 h-16 flex items-center gap-2.5 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-[#1447d4] flex items-center justify-center text-white font-black text-sm shadow-sm shadow-blue-700/30">i</div>
        <div>
          <p className="text-slate-900 font-black text-[15px] tracking-tight leading-none font-figtree">inaipi</p>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Admin</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3.5 space-y-6">
        {GROUPS.map(group => (
          <div key={group.title}>
            <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-300">{group.title}</p>
            <div className="space-y-0.5">
              {group.items.map(n => {
                const active = isActive(n.href, n.exact);
                const Icon = n.icon;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-colors ${
                      active ? 'bg-blue-50 text-[#1447d4]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[#1447d4]" />}
                    <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={2.2} />
                    {n.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3.5 border-t border-slate-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" strokeWidth={2.2} /> Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-[#f7f9fc]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex sticky top-0 h-screen">{Sidebar}</div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-900/40" onClick={() => setOpen(false)} />
          <div className="relative z-10 h-full">{Sidebar}</div>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200 h-16 px-5 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800">
              <Menu className="w-5 h-5" />
            </button>
            <p className="text-sm font-bold text-slate-800">{current?.label ?? 'Admin'}</p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1447d4] border border-slate-200 hover:border-blue-200 px-3.5 py-2 rounded-lg transition-colors"
          >
            View Site <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </header>
        <div className="flex-1 p-5 lg:p-8 max-w-6xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
