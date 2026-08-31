'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '../components/ImageUpload';
import RichEditor from '../components/RichEditor';
import DocumentsField from '../components/DocumentsField';
import { Field, inputCls, btnPrimary, btnGhost, Card } from '../ui';
import { htmlToParagraphs, type DocumentRef } from '@/lib/richtext';

export type BlogFormValues = {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  tags: string;   // comma-separated
  html: string;   // the rich body
  documents: DocumentRef[];
};

export const emptyBlog: BlogFormValues = {
  title: '', excerpt: '', image: '', category: 'Technology', author: 'Admin',
  tags: '', html: '', documents: [],
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
  const [error, setError] = useState('');
  const set = <K extends keyof BlogFormValues>(k: K, v: BlogFormValues[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSubmit({
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        // the plain paragraph array is kept in step with the rich body, so the
        // read-time estimate and older readers of that field still work
        content: htmlToParagraphs(form.html),
      });
    } catch (err) {
      // A save that failed used to leave for the list anyway, so an expired
      // session looked like a successful publish. Stay put: the post is still
      // in the form and can be submitted again.
      setSaving(false);
      setError(err instanceof Error ? err.message : 'Could not save. Please try again.');
      return;
    }
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
        <RichEditor
          label="Content"
          value={form.html}
          onChange={html => set('html', html)}
          hint="Headings, formatting, lists, links and images. Content pasted from a document keeps its formatting."
        />
        <Field label="Tags" hint="Comma-separated.">
          <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="AI, CX, Innovation" className={inputCls} />
        </Field>
      </Card>

      <Card className="p-6">
        <DocumentsField value={form.documents} onChange={docs => set('documents', docs)} />
      </Card>

      <div className="space-y-3">
        {error && (
          <p className="text-rose-600 text-sm font-medium bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{error}</p>
        )}
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className={btnPrimary}>{saving ? 'Saving…' : submitLabel}</button>
          <Link href="/admin/blogs" className={btnGhost}>Cancel</Link>
        </div>
      </div>
    </form>
  );
}
