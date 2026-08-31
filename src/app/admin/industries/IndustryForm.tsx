'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Field, inputCls, btnPrimary, btnGhost, Card } from '../ui';
import { INDUSTRY_ICON_NAMES } from '@/lib/industryIcons';

export type IndustryFormValues = {
  name: string;
  sub: string;
  icon: string;
  desc: string;
  useCases: string; // comma-separated
  content: string;  // blank-line separated paragraphs
};

export const emptyIndustry: IndustryFormValues = {
  name: '', sub: '', icon: 'Building2', desc: '', useCases: '', content: '',
};

export default function IndustryForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial: IndustryFormValues;
  submitLabel: string;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<IndustryFormValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const set = (k: keyof IndustryFormValues, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSubmit({
        ...form,
        useCases: form.useCases.split(',').map(t => t.trim()).filter(Boolean),
        content: form.content.split('\n\n').map(p => p.trim()).filter(Boolean),
      });
    } catch (err) {
      // stay on the form so nothing that was typed is lost
      setSaving(false);
      setError(err instanceof Error ? err.message : 'Could not save. Please try again.');
      return;
    }
    router.push('/admin/industries');
  };

  return (
    <form onSubmit={submit} className="space-y-5 max-w-3xl">
      <Card className="p-6 space-y-5">
        <Field label="Industry name" required>
          <input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="Healthcare" className={inputCls} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Sub-heading" hint="Shown under the name in the admin list.">
            <input value={form.sub} onChange={e => set('sub', e.target.value)} placeholder="Life Sciences" className={inputCls} />
          </Field>
          <Field label="Card icon">
            <select value={form.icon} onChange={e => set('icon', e.target.value)} className={inputCls}>
              {INDUSTRY_ICON_NAMES.map(n => <option key={n}>{n}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Card description" required hint="The sentence on the homepage card.">
          <textarea value={form.desc} onChange={e => set('desc', e.target.value)} required rows={3} placeholder="What Inaipi does for this sector…" className={`${inputCls} resize-none`} />
        </Field>
        <Field label="Use cases" hint="Comma-separated. These are the tags on the card and the list on the detail page.">
          <input value={form.useCases} onChange={e => set('useCases', e.target.value)} placeholder="Appointment Automation, Patient Surveys" className={inputCls} />
        </Field>
      </Card>

      <Card className="p-6 space-y-5">
        <Field label="Detail page content" hint="Separate paragraphs with a blank line. Leave empty to show the card description alone.">
          <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={12} placeholder={'First paragraph…\n\nSecond paragraph…'} className={`${inputCls} resize-none`} />
        </Field>
      </Card>

      <div className="space-y-3">
        {error && (
          <p className="text-rose-600 text-sm font-medium bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{error}</p>
        )}
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className={btnPrimary}>{saving ? 'Saving…' : submitLabel}</button>
          <Link href="/admin/industries" className={btnGhost}>Cancel</Link>
        </div>
      </div>
    </form>
  );
}
