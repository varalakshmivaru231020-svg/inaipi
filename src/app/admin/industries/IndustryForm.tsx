'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Field, inputCls, btnPrimary, btnGhost, Card } from '../ui';
import ImageUpload from '../components/ImageUpload';
import RichEditor from '../components/RichEditor';
import DocumentsField from '../components/DocumentsField';
import { INDUSTRY_ICON_NAMES, industryIcon } from '@/lib/industryIcons';
import { htmlToParagraphs, type DocumentRef } from '@/lib/richtext';

export type IndustryFormValues = {
  name: string;
  sub: string;
  icon: string;
  iconUrl: string;
  desc: string;
  useCases: string; // comma-separated
  html: string;
  documents: DocumentRef[];
};

export const emptyIndustry: IndustryFormValues = {
  name: '', sub: '', icon: 'Building2', iconUrl: '', desc: '', useCases: '', html: '', documents: [],
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
  const set = <K extends keyof IndustryFormValues>(k: K, v: IndustryFormValues[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const BuiltIn = industryIcon(form.icon);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSubmit({
        ...form,
        useCases: form.useCases.split(',').map(t => t.trim()).filter(Boolean),
        content: htmlToParagraphs(form.html),
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
        <Field label="Sub-heading" hint="Shown under the name on the detail page.">
          <input value={form.sub} onChange={e => set('sub', e.target.value)} placeholder="Life Sciences" className={inputCls} />
        </Field>
        <Field label="Card description" required hint="The sentence on the homepage card.">
          <textarea value={form.desc} onChange={e => set('desc', e.target.value)} required rows={3} placeholder="What Inaipi does for this sector…" className={`${inputCls} resize-none`} />
        </Field>
        <Field label="Use cases" hint="Comma-separated. These are the tags on the card and the list on the detail page.">
          <input value={form.useCases} onChange={e => set('useCases', e.target.value)} placeholder="Appointment Automation, Patient Surveys" className={inputCls} />
        </Field>
      </Card>

      {/* The card icon: one of the built-in marks, or any image the team uploads
          or links, so a new sector is not limited to the built-in list. */}
      <Card className="p-6 space-y-5">
        <div className="flex items-center gap-4">
          <span className="w-14 h-14 rounded-xl bg-[#1447d4] flex items-center justify-center shrink-0 overflow-hidden">
            {form.iconUrl
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={form.iconUrl} alt="" className="w-8 h-8 object-contain" />
              : <BuiltIn className="w-6 h-6 text-white" />}
          </span>
          <div className="flex-1">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Card icon</p>
            <p className="text-xs text-slate-400">
              {form.iconUrl ? 'Using the custom image below. Remove it to go back to a built-in icon.' : 'Pick a built-in icon, or upload your own below.'}
            </p>
          </div>
        </div>

        <Field label="Built-in icon">
          <select value={form.icon} onChange={e => set('icon', e.target.value)} className={inputCls} disabled={!!form.iconUrl}>
            {INDUSTRY_ICON_NAMES.map(n => <option key={n}>{n}</option>)}
          </select>
        </Field>

        <ImageUpload
          label="Custom icon (optional)"
          value={form.iconUrl}
          onChange={url => set('iconUrl', url)}
          hint="A transparent PNG or SVG works best. When set, this is used instead of the built-in icon."
        />
      </Card>

      <Card className="p-6 space-y-5">
        <RichEditor
          label="Detail page content"
          value={form.html}
          onChange={html => set('html', html)}
          hint="Headings, formatting, lists, links and images. Leave empty to show the card description alone."
        />
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
          <Link href="/admin/industries" className={btnGhost}>Cancel</Link>
        </div>
      </div>
    </form>
  );
}
