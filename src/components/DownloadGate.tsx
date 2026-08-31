'use client';

import { useState } from 'react';
import { FileText, Download, X, Loader2, Check } from 'lucide-react';
import type { DocumentRef } from '@/lib/richtext';

/**
 * Documents are gated: a visitor gives their name and email before the file is
 * handed over, and the submission is stored as an enquiry so it shows up in the
 * admin alongside the contact form rather than in a second inbox. Only the
 * download is gated; the page itself reads normally.
 */
export default function DownloadGate({
  documents,
  source,
  title,
}: {
  documents: DocumentRef[];
  source: string;   // which content type the download came from
  title: string;    // the entry being downloaded from
}) {
  const [open, setOpen] = useState<DocumentRef | null>(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', website: '' });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState<string | null>(null);

  if (!documents.length) return null;

  const close = () => { setOpen(null); setError(''); setSending(false); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!open) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/download-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          document: open.name,
          file: open.url,
          source,
          title,
          website: form.website,
        }),
      });
      if (!res.ok) throw new Error('save failed');
    } catch {
      setSending(false);
      setError('We could not record your details. Please try again.');
      return;
    }
    setSending(false);
    setDone(open.url);
    // hand the file over only once the details are in
    const a = document.createElement('a');
    a.href = open.url;
    a.download = open.name;
    a.rel = 'noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
    close();
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold font-figtree tracking-[-0.025em] text-[#0f172a] leading-[1.15] mb-5">
        {documents.length === 1 ? 'Download' : 'Downloads'}
      </h2>
      <div className="space-y-3">
        {documents.map(doc => (
          <button
            key={doc.url}
            type="button"
            onClick={() => { setOpen(doc); setError(''); }}
            className="w-full flex items-center gap-3 text-left rounded-2xl border border-blue-100 bg-[#f8faff] hover:border-[#1447d4] hover:shadow-md transition-all p-4 group"
          >
            <span className="w-11 h-11 rounded-xl bg-[#1447d4] text-white flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[15px] font-bold text-[#0f172a] truncate">{doc.name}</span>
              <span className="block text-xs text-slate-400 mt-0.5">
                {done === doc.url ? 'Downloaded' : 'Share your details to download'}
              </span>
            </span>
            <span className="shrink-0 text-[#1447d4] group-hover:translate-x-0.5 transition-transform">
              {done === doc.url ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5" />}
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          style={{ background: 'rgba(11,42,107,.45)' }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Download ${open.name}`}
        >
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 relative" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Before you download</p>
            <h3 className="text-xl font-bold font-figtree text-[#0f172a] leading-snug mb-1.5">{open.name}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              Tell us where to reach you and the download will start straight away.
            </p>

            <form onSubmit={submit} className="space-y-3">
              <input
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                autoComplete="name"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#1447d4] transition-colors"
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="Work email"
                autoComplete="email"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#1447d4] transition-colors"
              />
              <input
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                placeholder="Company (optional)"
                autoComplete="organization"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#1447d4] transition-colors"
              />
              {/* a field no person sees, so anything in it came from a bot */}
              <input
                value={form.website}
                onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              {error && <p className="text-rose-500 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#1447d4] hover:bg-[#0d3ab8] text-white font-bold text-sm py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {sending ? 'One moment…' : 'Download now'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
