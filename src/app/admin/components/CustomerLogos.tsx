'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { Card, btnPrimary, btnGhost, inputCls } from '../ui';

type Logo = { url: string; name: string };

/**
 * Manages the homepage customer logo strip. Logos are stored as a JSON list in
 * the generic settings store and uploaded through the shared upload endpoint.
 */
export default function CustomerLogos() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/customer-logos')
      .then(r => r.json())
      .then(d => setLogos(Array.isArray(d.logos) ? d.logos : []))
      .catch(() => setLogos([]))
      .finally(() => setLoading(false));
  }, []);

  const update = (i: number, patch: Partial<Logo>) =>
    setLogos(ls => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));

  const move = (i: number, dir: -1 | 1) =>
    setLogos(ls => {
      const j = i + dir;
      if (j < 0 || j >= ls.length) return ls;
      const next = [...ls];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const save = async () => {
    setSaving(true);
    // Blank rows are dropped server-side so the strip never gets an empty image.
    const res = await fetch('/api/admin/customer-logos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logos }),
    });
    if (res.ok) {
      const d = await res.json();
      setLogos(Array.isArray(d.logos) ? d.logos : []);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Section</p>
          <h2 className="text-base font-bold text-slate-800">Customer Logos</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Logos shown in the scrolling &ldquo;Trusted by&rdquo; strip. Transparent PNG or SVG works best;
            they are rendered in white on the blue strip. Leave the list empty to hide the logos;
            the strip and the 500+ badge still show.
          </p>
        </div>
        <button onClick={save} disabled={saving} className={btnPrimary}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
          {saving ? 'Saving…' : saved ? 'Saved' : 'Save Logos'}
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : logos.length === 0 ? (
        <p className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl p-6 text-center">
          No logos yet. Add one when the customer supplies their artwork.
        </p>
      ) : (
        <div className="space-y-4">
          {logos.map((logo, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Logo {i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className={btnGhost} aria-label="Move up">
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => move(i, 1)} disabled={i === logos.length - 1} className={btnGhost} aria-label="Move down">
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLogos(ls => ls.filter((_, j) => j !== i))}
                    className={btnGhost}
                    aria-label="Remove logo"
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" />
                  </button>
                </div>
              </div>
              <input
                className={inputCls}
                placeholder="Customer name (used as image alt text)"
                value={logo.name}
                onChange={e => update(i, { name: e.target.value })}
              />
              <ImageUpload
                label="Logo image"
                value={logo.url}
                onChange={url => update(i, { url })}
                hint="Transparent PNG or SVG, roughly 240×80px"
              />
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setLogos(ls => [...ls, { url: '', name: '' }])} className={btnGhost}>
        <Plus className="w-4 h-4" /> Add logo
      </button>
    </Card>
  );
}
