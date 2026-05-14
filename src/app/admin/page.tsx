'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [blogCount, setBlogCount]             = useState(0);
  const [testimonialCount, setTestimonialCount] = useState(0);

  useEffect(() => {
    fetch('/api/admin/blogs').then(r => r.json()).then(d => setBlogCount(d.length));
    fetch('/api/admin/testimonials').then(r => r.json()).then(d => setTestimonialCount(d.length));
  }, []);

  const cards = [
    { label: 'Blog Posts',   value: blogCount,        href: '/admin/blogs',        color: '#1447d4' },
    { label: 'Testimonials', value: testimonialCount, href: '/admin/testimonials', color: '#7c3aed' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0f172a] font-figtree mb-2">Welcome back</h1>
      <p className="text-slate-400 text-sm mb-8">Manage your website content from here.</p>

      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        {cards.map(c => (
          <Link key={c.label} href={c.href}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{c.label}</p>
              <p className="text-4xl font-black text-[#0f172a] font-figtree">{c.value}</p>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform"
              style={{ background: c.color }}>
              {c.label === 'Blog Posts' ? '✎' : '❝'}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Link href="/admin/blogs/new"
          className="bg-[#1447d4] hover:bg-[#0d3ab8] text-white rounded-2xl p-6 flex items-center gap-4 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">+</div>
          <div>
            <p className="font-black text-sm">New Blog Post</p>
            <p className="text-white/60 text-xs">Write and publish an article</p>
          </div>
        </Link>
        <Link href="/admin/testimonials"
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-2xl p-6 flex items-center gap-4 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">❝</div>
          <div>
            <p className="font-black text-sm">Manage Testimonials</p>
            <p className="text-white/60 text-xs">Add or edit customer reviews</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
