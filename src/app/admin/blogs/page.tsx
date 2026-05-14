'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Blog = { id: string; title: string; category: string; author: string; date: string };

export default function AdminBlogs() {
  const [blogs, setBlogs]   = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/admin/blogs').then(r => r.json()).then(d => { setBlogs(d); setLoading(false); });
  };

  useEffect(load, []);

  const del = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a] font-figtree">Blog Posts</h1>
          <p className="text-slate-400 text-sm">{blogs.length} articles</p>
        </div>
        <Link href="/admin/blogs/new"
          className="bg-[#1447d4] hover:bg-[#0d3ab8] text-white font-black text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl transition-colors">
          + New Post
        </Link>
      </div>

      {loading ? (
        <div className="text-slate-400 text-sm py-12 text-center">Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-4xl mb-3">✎</p>
          <p className="font-bold">No blog posts yet</p>
          <Link href="/admin/blogs/new" className="text-[#1447d4] text-sm font-bold hover:underline mt-2 block">Create your first post</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map(b => (
            <div key={b.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#0f172a] truncate">{b.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-bold text-[#1447d4] bg-blue-50 px-2 py-0.5 rounded-full">{b.category}</span>
                  <span className="text-xs text-slate-400">{b.author}</span>
                  <span className="text-xs text-slate-400">{b.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/admin/blogs/${b.id}`}
                  className="text-xs font-bold text-slate-500 hover:text-[#1447d4] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                  Edit
                </Link>
                <button onClick={() => del(b.id, b.title)}
                  className="text-xs font-bold text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
