'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '../components/ImageUpload';
import { Field, inputCls, btnPrimary, btnGhost, Card } from '../ui';

export type BlogFormValues = {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  tags: string;    // comma-separated
  content: string; // blank-line separated paragraphs
};

export const emptyBlog: BlogFormValues = {
  title: '', excerpt: '', image: '', category: 'Technology', author: 'Admin', tags: '', content: '',
};

const CATEGORIES = ['Technology', 'Business', 'Design', 'Updates', 'Innovation'];

export default function BlogForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial: BlogFormValues;
  submitLabel: string;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormValues>(initial);
  const [saving, setSaving] = useState(false);
  const set = (k: keyof BlogFormValues, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSubmit({
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      content: form.content.split('\n\n').map(p => p.trim()).filter(Boolean),
    });
    router.push('/admin/blogs');
  };

  return (
    <form onSubmit={submit} className="space-y-5 max-w-3xl">
      <Card className="p-6 space-y-5">
        <Field label="Title" required>
          <input value={form.title} onChange={e => set('title', e.target.value)} required placeholder="Post title" className={inputCls} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Category">
            <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Author">
            <input value={form.author} onChange={e => set('author', e.target.value)} className={inputCls} />
          </Field>
        </div>
        <ImageUpload label="Cover Image" value={form.image} onChange={url => set('image', url)} hint="Recommended: 1200×630px, JPG or WebP" />
      </Card>

      <Card className="p-6 space-y-5">
        <Field label="Excerpt / Summary" required>
          <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} required rows={3} placeholder="Short description shown on the blog list…" className={`${inputCls} resize-none`} />
        </Field>
        <Field label="Content" required hint="Separate paragraphs with a blank line.">
          <textarea value={form.content} onChange={e => set('content', e.target.value)} required rows={12} placeholder={'First paragraph…\n\nSecond paragraph…'} className={`${inputCls} resize-none`} />
        </Field>
        <Field label="Tags" hint="Comma-separated.">
          <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="AI, CX, Innovation" className={inputCls} />
        </Field>
      </Card>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className={btnPrimary}>{saving ? 'Saving…' : submitLabel}</button>
        <Link href="/admin/blogs" className={btnGhost}>Cancel</Link>
      </div>
    </form>
  );
}
