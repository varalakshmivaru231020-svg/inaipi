'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText, Briefcase, Quote, Search, Image as ImageIcon, ArrowRight, Plus,
} from 'lucide-react';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ blogs: 0, jobs: 0, testimonials: 0 });

  useEffect(() => {
    const grab = (url: string) => fetch(url).then(r => r.json()).then(d => (Array.isArray(d) ? d.length : 0)).catch(() => 0);
    Promise.all([grab('/api/admin/blogs'), grab('/api/admin/jobs'), grab('/api/admin/testimonials')]).then(
      ([blogs, jobs, testimonials]) => setCounts({ blogs, jobs, testimonials })
    );
  }, []);

  const stats = [
    { label: 'Blog Posts', value: counts.blogs, href: '/admin/blogs', icon: FileText, tint: 'bg-blue-50 text-[#1447d4]' },
    { label: 'Open Roles', value: counts.jobs, href: '/admin/jobs', icon: Briefcase, tint: 'bg-emerald-50 text-emerald-600' },
    { label: 'Testimonials', value: counts.testimonials, href: '/admin/testimonials', icon: Quote, tint: 'bg-violet-50 text-violet-600' },
  ];

  const actions = [
    { label: 'Write a blog post', desc: 'Publish a new article', href: '/admin/blogs/new', icon: FileText },
    { label: 'Post a job', desc: 'Add a career opening', href: '/admin/jobs/new', icon: Briefcase },
    { label: 'Edit page SEO', desc: 'Titles, meta & social tags', href: '/admin/seo', icon: Search },
    { label: 'Update section images', desc: 'Homepage & section media', href: '/admin/site-images', icon: ImageIcon },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-slate-900 tracking-tight font-figtree">Welcome back 👋</h1>
        <p className="text-slate-400 text-sm mt-1.5">Manage everything on your website from one place.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm shadow-slate-200/40 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.tint}`}>
                  <Icon className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1447d4] group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-4xl font-black text-slate-900 font-figtree mt-4 leading-none">{s.value}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">{s.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Quick Actions</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {actions.map(a => {
          const Icon = a.icon;
          return (
            <Link
              key={a.label}
              href={a.href}
              className="group flex items-center gap-4 bg-white rounded-2xl p-4 border border-slate-200/70 shadow-sm shadow-slate-200/40 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center text-slate-500 group-hover:text-[#1447d4] transition-colors">
                <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-sm">{a.label}</p>
                <p className="text-xs text-slate-400">{a.desc}</p>
              </div>
              <Plus className="w-4 h-4 text-slate-300 group-hover:text-[#1447d4] transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
