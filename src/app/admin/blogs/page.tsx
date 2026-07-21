'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Plus, Calendar, User } from 'lucide-react';
import { PageHeader, Card, Badge, EmptyState, LoadingRows, btnPrimary } from '../ui';

type Blog = { id: string; title: string; category: string; author: string; date: string; image?: string };

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
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
      <PageHeader
        title="Blog Posts"
        subtitle={`${blogs.length} ${blogs.length === 1 ? 'article' : 'articles'}`}
        action={<Link href="/admin/blogs/new" className={btnPrimary}><Plus className="w-4 h-4" /> New Post</Link>}
      />

      {loading ? (
        <LoadingRows />
      ) : blogs.length === 0 ? (
        <Card className="p-6">
          <EmptyState icon={<FileText className="w-6 h-6" />} title="No blog posts yet">
            <Link href="/admin/blogs/new" className="text-[#1447d4] font-bold hover:underline">Create your first post →</Link>
          </EmptyState>
        </Card>
      ) : (
        <div className="space-y-3">
          {blogs.map(b => (
            <Card key={b.id} className="p-4 flex items-center gap-4">
              <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                {b.image ? <img src={b.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><FileText className="w-4 h-4" /></div>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 truncate">{b.title}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <Badge tone="blue">{b.category}</Badge>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400"><User className="w-3 h-3" /> {b.author}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400"><Calendar className="w-3 h-3" /> {b.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link href={`/admin/blogs/${b.id}`} className="text-xs font-bold text-slate-500 hover:text-[#1447d4] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">Edit</Link>
                <button onClick={() => del(b.id, b.title)} className="text-xs font-bold text-slate-400 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors">Delete</button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
