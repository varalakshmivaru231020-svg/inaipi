'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Loader2, RotateCcw, Upload } from 'lucide-react';
import { PageHeader, Card, btnPrimary, btnGhost, inputCls } from '../ui';

/**
 * Branding — the browser tab icon.
 *
 * The icon is served by /api/favicon rather than baked into the build, so
 * saving here changes it on the live site without a deploy. Clearing the field
 * puts the Inaipi mark that ships with the site back.
 */

const DEFAULT_NOTE = 'Inaipi mark (shipped with the site)';

export default function AdminBranding() {
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  /* bumped after a save so the previews re-request the icon */
  const [stamp, setStamp] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => setIcon(typeof d.site_favicon === 'string' ? d.site_favicon : ''))
      .catch(() => setIcon(''))
      .finally(() => setLoading(false));
  }, []);

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
    const { url } = await res.json();
    setIcon(url);
  };

  const save = async () => {
    setSaving(true);
    setError('');
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site_favicon: icon.trim() }),
    });
    if (res.ok) {
      const d = await res.json();
      setIcon(typeof d.site_favicon === 'string' ? d.site_favicon : '');
      setStamp(Date.now());
    } else {
      setError('Could not save. Try again.');
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const live = `/api/favicon${stamp ? `?v=${stamp}` : ''}`;

  return (
    <div>
      <PageHeader
        title="Branding"
        subtitle="The icon shown in the browser tab"
        action={
          <button onClick={save} disabled={saving || loading} className={btnPrimary}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
            {saving ? 'Saving…' : saved ? 'Saved' : 'Save Icon'}
          </button>
        }
      />

      <div className="space-y-5 max-w-3xl">
        <Card className="p-6 space-y-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Favicon</p>
            <h2 className="text-base font-bold text-slate-800">Browser tab icon</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              A square PNG of 512×512 works best, and a .ico or SVG is fine too. Leave it empty to use the{' '}
              {DEFAULT_NOTE.toLowerCase()}.
            </p>
          </div>

          {/* what a visitor actually sees, at the sizes a browser uses */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Live on the site now</p>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 rounded-t-lg bg-slate-100 border border-slate-200 px-3 py-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={`t${stamp}`} src={live} alt="Tab icon" width={16} height={16} className="w-4 h-4 object-contain" />
                <span className="text-xs font-semibold text-slate-600">Inaipi | AI-Native CX</span>
              </div>
              {[16, 32, 64].map(s => (
                <div key={s} className="flex flex-col items-center gap-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img key={`${s}-${stamp}`} src={live} alt={`${s} pixels`} style={{ width: s, height: s }} className="object-contain" />
                  <span className="text-[10px] font-bold text-slate-400">{s}px</span>
                </div>
              ))}
            </div>
          </div>

          {/* pick a new one */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Replace it</p>
            <div className="flex items-center gap-3 flex-wrap">
              <button type="button" onClick={() => fileRef.current?.click()} className={btnGhost} disabled={uploading}>
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploading ? 'Uploading…' : 'Upload an icon'}
              </button>
              <button
                type="button"
                onClick={() => setIcon('')}
                className={btnGhost}
                disabled={!icon}
                title="Go back to the icon that ships with the site"
              >
                <RotateCcw className="w-4 h-4" /> Use the default
              </button>
              {icon ? (
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon} alt="Chosen icon" className="w-6 h-6 object-contain rounded border border-slate-200 bg-white" />
                  chosen, not saved yet
                </span>
              ) : (
                <span className="text-xs text-slate-400">{DEFAULT_NOTE}</span>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".ico,.png,.svg,.webp,image/x-icon,image/vnd.microsoft.icon,image/png,image/svg+xml,image/webp"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
            />
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-slate-400 shrink-0">or paste a path:</span>
              <input
                type="text"
                inputMode="url"
                className={inputCls}
                placeholder="/uploads/my-icon.png"
                value={icon}
                onChange={e => setIcon(e.target.value)}
              />
            </div>
            {error && <p className="text-rose-500 text-xs mt-2">{error}</p>}
            <p className="text-xs text-slate-400 mt-3">
              Browsers hold on to the old icon for a while — after saving, reload the site with a hard refresh
              (Ctrl+Shift+R) to see the change straight away.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
