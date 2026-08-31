'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '../components/ImageUpload';
import RichEditor from '../components/RichEditor';
import DocumentsField from '../components/DocumentsField';
import { Field, inputCls, btnPrimary, btnGhost, Card } from '../ui';
import { htmlToParagraphs, type DocumentRef } from '@/lib/richtext';

export type ResourceFormValues = {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  html: string;
  documents: DocumentRef[];
};

export const emptyResource: ResourceFormValues = {
  title: '', excerpt: '', image: '', category: 'Brochure', html: '', documents: [],
};

const CATEGORIES = ['Brochure', 'Whitepaper', 'Case Study', 'Datasheet', 'Guide'];

export default function ResourceForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial: ResourceFormValues;
  submitLabel: string;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ResourceFormValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const set = <K extends keyof ResourceFormValues>(k: K, v: ResourceFormValues[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSubmit({ ...form, content: htmlToParagraphs(form.html) });
    } catch (err) {
      // stay on the form so nothing that was typed is lost
      setSaving(false);
      setError(err instanceof Error ? err.message : 'Could not save. Please try again.');
      return;
    }
    router.push('/admin/resources');
  };

  return (
    <form onSubmit={submit} className="space-y-5 max-w-3xl">
      <Card className="p-6 space-y-5">
        <Field label="Title" required>
          <input value={form.title} onChange={e => set('title', e.target.value)} required placeholder="Platform overview brochure" className={inputCls} />
        </Field>
        <Field label="Type">
          <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Summary" required hint="Shown on the Buyer Resources listing.">
          <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} required rows={3} placeholder="What this resource covers…" className={`${inputCls} resize-none`} />
        </Field>
        <ImageUpload label="Cover image" value={form.image} onChange={url => set('image', url)} hint="Recommended: 1200×630px, JPG or WebP" />
      </Card>

      <Card className="p-6 space-y-5">
        <RichEditor
          label="Detailed content"
          value={form.html}
          onChange={html => set('html', html)}
          hint="Headings, formatting, lists, links and images. Content pasted from a document keeps its formatting."
        />
      </Card>

      <Card className="p-6">
        <DocumentsField
          label="Downloadable documents"
          value={form.documents}
          onChange={docs => set('documents', docs)}
        />
      </Card>

      <div className="space-y-3">
        {error && (
          <p className="text-rose-600 text-sm font-medium bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{error}</p>
        )}
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className={btnPrimary}>{saving ? 'Saving…' : submitLabel}</button>
          <Link href="/admin/resources" className={btnGhost}>Cancel</Link>
        </div>
      </div>
    </form>
  );
}
