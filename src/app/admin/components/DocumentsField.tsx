'use client';

import { useRef, useState } from 'react';
import { FileText, Loader2, Plus, Trash2, Download } from 'lucide-react';
import { inputCls, btnGhost } from '../ui';

export type DocumentRef = { name: string; url: string };

/**
 * The one document field. Blog posts, industries and buyer resources attach
 * their brochures and documents through this, so upload, naming and removal
 * behave the same everywhere. Entries are stored as [{ name, url }].
 */
export default function DocumentsField({
  value,
  onChange,
  label = 'Documents',
  hint = 'PDF, Word, Excel, PowerPoint or ZIP, up to 25 MB. Visitors fill in a short form before downloading.',
}: {
  value: DocumentRef[];
  onChange: (docs: DocumentRef[]) => void;
  label?: string;
  hint?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const upload = async (file: File) => {
    setUploading(true);
    setError('');
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
    setUploading(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || 'Upload failed. Try again.');
      return;
    }
    const d = await res.json();
    onChange([...value, { name: d.name || file.name, url: d.url }]);
  };

  const update = (i: number, patch: Partial<DocumentRef>) =>
    onChange(value.map((doc, j) => (j === i ? { ...doc, ...patch } : doc)));

  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>

      {value.length > 0 && (
        <div className="space-y-2 mb-3">
          {value.map((doc, i) => (
            <div key={doc.url + i} className="flex items-center gap-2 border border-slate-200 rounded-xl p-2.5">
              <span className="w-9 h-9 rounded-lg bg-blue-50 text-[#1447d4] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </span>
              <input
                className={`${inputCls} flex-1`}
                value={doc.name}
                onChange={e => update(i, { name: e.target.value })}
                placeholder="Document name shown on the site"
              />
              <a href={doc.url} target="_blank" rel="noreferrer" className={btnGhost} aria-label="Open document">
                <Download className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className={btnGhost}
                aria-label="Remove document"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className={btnGhost}>
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        {uploading ? 'Uploading…' : 'Add document'}
      </button>

      <p className="text-xs text-slate-400 mt-1.5">{hint}</p>
      {error && <p className="text-rose-500 text-xs mt-1">{error}</p>}

      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.zip"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
      />
    </div>
  );
}
