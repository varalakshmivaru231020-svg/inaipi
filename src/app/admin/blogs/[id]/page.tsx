'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '../../components/ImageUpload';

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const router  = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', excerpt: '', image: '', category: 'Technology',
    author: '', tags: '', content: '',
  });

  useEffect(() => {
    fetch(`/api/admin/blogs/${id}`).then(r => r.json()).then(b => {
      setForm({
        title:    b.title ?? '',
        excerpt:  b.excerpt ?? '',
        image:    b.image ?? '',
        category: b.category ?? 'Technology',
        author:   b.author ?? '',
        tags:     (b.tags ?? []).join(', '),
        content:  (b.content ?? []).join('\n\n'),
      });
    });
  }, [id]);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/admin/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        content: form.content.split('\n\n').filter(Boolean),
      }),
    });
    router.push('/admin/blogs');
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blogs" className="text-slate-400 hover:text-slate-600 text-sm">← Back</Link>
        <h1 className="text-2xl font-bold text-[#0f172a] font-figtree">Edit Blog Post</h1>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <Field label="Title" required>
          <input value={form.title} onChange={e => set('title', e.target.value)} required className={inp} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Category">
            <select value={form.category} onChange={e => set('category', e.target.value)} className={inp}>
              {['Technology','Business','Design','Updates','Innovation'].map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Author">
            <input value={form.author} onChange={e => set('author', e.target.value)} className={inp} />
          </Field>
        </div>
        <ImageUpload
          label="Cover Image"
          value={form.image}
          onChange={url => set('image', url)}
          hint="Recommended: 1200×630px, JPG or WebP"
        />
        <Field label="Excerpt" required>
          <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} required rows={3} className={inp} />
        </Field>
        <Field label="Content (blank line between paragraphs)" required>
          <textarea value={form.content} onChange={e => set('content', e.target.value)} required rows={10} className={inp} />
        </Field>
        <Field label="Tags (comma-separated)">
          <input value={form.tags} onChange={e => set('tags', e.target.value)} className={inp} />
        </Field>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="bg-[#1447d4] hover:bg-[#0d3ab8] text-white font-black text-sm uppercase tracking-widest px-6 py-3 rounded-xl transition-colors disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin/blogs" className="px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

const inp = 'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0f172a] focus:outline-none focus:border-[#1447d4] transition-colors resize-none';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
