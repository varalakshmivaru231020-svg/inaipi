'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Field, inputCls, btnPrimary, btnGhost, Card } from '../ui';
import Link from 'next/link';

export type JobFormValues = {
  title: string;
  type: string;
  location: string;
  salary: string;
  slug: string;
  desc: string;
  responsibilities: string; // newline-separated in the form
  requirements: string;
  offers: string;
};

export const emptyJob: JobFormValues = {
  title: '', type: 'Full time', location: '', salary: 'Competitive', slug: '',
  desc: '', responsibilities: '', requirements: '', offers: '',
};

const TYPES = ['Full time', 'Part time', 'Contract', 'Internship', 'Remote'];
const toLines = (s: string) => s.split('\n').map(l => l.trim()).filter(Boolean);

export default function JobForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial: JobFormValues;
  submitLabel: string;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<JobFormValues>(initial);
  const [saving, setSaving] = useState(false);
  const set = (k: keyof JobFormValues, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSubmit({
      title: form.title,
      type: form.type,
      location: form.location,
      salary: form.salary,
      slug: form.slug,
      desc: form.desc,
      responsibilities: toLines(form.responsibilities),
      requirements: toLines(form.requirements),
      offers: toLines(form.offers),
    });
    router.push('/admin/jobs');
  };

  return (
    <form onSubmit={submit} className="space-y-5 max-w-3xl">
      <Card className="p-6 space-y-5">
        <Field label="Job Title" required>
          <input value={form.title} onChange={e => set('title', e.target.value)} required placeholder="Senior CX Consultant" className={inputCls} />
        </Field>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Type">
            <select value={form.type} onChange={e => set('type', e.target.value)} className={inputCls}>
              {TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Location">
            <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Dubai, UAE" className={inputCls} />
          </Field>
          <Field label="Salary">
            <input value={form.salary} onChange={e => set('salary', e.target.value)} placeholder="Competitive" className={inputCls} />
          </Field>
        </div>
        <Field label="URL Slug" hint="Leave blank to auto-generate from the title (used in /career/your-slug).">
          <input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="senior-cx-consultant" className={inputCls} />
        </Field>
        <Field label="Short Description" required>
          <textarea value={form.desc} onChange={e => set('desc', e.target.value)} required rows={3} placeholder="One or two sentences shown on the careers grid…" className={`${inputCls} resize-none`} />
        </Field>
      </Card>

      <Card className="p-6 space-y-5">
        <Field label="Key Responsibilities" hint="One per line.">
          <textarea value={form.responsibilities} onChange={e => set('responsibilities', e.target.value)} rows={6} placeholder={'Lead CX strategy workshops…\nMap customer journeys…'} className={`${inputCls} resize-none`} />
        </Field>
        <Field label="Requirements" hint="One per line.">
          <textarea value={form.requirements} onChange={e => set('requirements', e.target.value)} rows={6} placeholder={'5+ years of experience…\nExcellent communication…'} className={`${inputCls} resize-none`} />
        </Field>
        <Field label="What We Offer" hint="One per line.">
          <textarea value={form.offers} onChange={e => set('offers', e.target.value)} rows={6} placeholder={'Competitive compensation…\nFlexible work arrangements…'} className={`${inputCls} resize-none`} />
        </Field>
      </Card>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving ? 'Saving…' : submitLabel}
        </button>
        <Link href="/admin/jobs" className={btnGhost}>Cancel</Link>
      </div>
    </form>
  );
}
