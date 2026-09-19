'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, BadgeCheck, ImageIcon } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import { PageHeader, Card, inputCls, btnPrimary, btnGhost } from '../ui';

/**
 * The customer logo strip — the "Trusted by 500+ enterprise customers across
 * the region" band on the home page.
 *
 * Everything about it lives here: whether the strip shows at all, and the
 * logos themselves — add, rename, reorder, hide and remove. The logos are the
 * same JSON list in the settings store they have always been, so nothing that
 * was already uploaded is disturbed.
 */

type Logo = { url: string; name: string; hidden: boolean };

export default function AdminLogoStrip() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* Whether the whole strip shows, kept in the existing settings store. */
  const [shown, setShown] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/admin/customer-logos')
      .then(r => r.json())
      .then(d => setLogos(Array.isArray(d.logos) ? d.logos : []))
      .catch(() => setLogos([]))
      .finally(() => setLoading(false));
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => setShown(d.show_trust_logos !== false))
      .catch(() => setShown(true));
  }, []);

  const setSection = async (on: boolean) => {
    setShown(on);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ show_trust_logos: String(on) }),
    });
  };

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

  const live = logos.filter(l => l.url && !l.hidden).length;
  const on = shown !== false;

  return (
    <div>
      <PageHeader
        title="Customer Logo Strip"
        subtitle={`${live} ${live === 1 ? 'logo' : 'logos'} on the strip${logos.length !== live ? ` · ${logos.length - live} hidden or empty` : ''}`}
        action={
          <button onClick={save} disabled={saving} className={btnPrimary}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
            {saving ? 'Saving…' : saved ? 'Saved' : 'Save Logos'}
          </button>
        }
      />

      {/* Whether the band appears on the home page at all */}
      <Card className="p-5 mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Website visibility</p>
        <div className="flex items-center gap-4">
          <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${on ? 'bg-blue-50 text-[#1447d4]' : 'bg-slate-100 text-slate-400'}`}>
            <BadgeCheck className="w-5 h-5" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800">Customer logo strip</p>
            <p className="text-xs text-slate-400 mt-0.5">
              &ldquo;Trusted by 500+ enterprise customers across the region&rdquo; and the scrolling logos beneath it
            </p>
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 ${on ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
            {on ? 'Shown' : 'Hidden'}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label="Show the customer logo strip on the website"
            onClick={() => setSection(!on)}
            className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${on ? 'bg-[#1447d4]' : 'bg-slate-200'}`}
          >
            <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? 'left-6' : 'left-1'}`} />
          </button>
        </div>
        {shown === null && <p className="text-xs text-slate-400 mt-3">Loading…</p>}
      </Card>

      {/* The logos themselves */}
      <Card className="p-6 space-y-5">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Logos</p>
          <p className="text-xs text-slate-400">
            Transparent PNG or SVG works best; they render in white on the blue strip. Drag order is set with the
            arrows — the strip scrolls them in this order. Changes are saved when you press Save Logos.
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</p>
        ) : logos.length === 0 ? (
          <div className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl p-8 text-center">
            <ImageIcon className="w-6 h-6 mx-auto mb-2 text-slate-300" />
            No logos yet. Add one when the customer supplies their artwork.
          </div>
        ) : (
          <div className="space-y-4">
            {logos.map((logo, i) => (
              <div
                key={i}
                className={`border rounded-xl p-4 space-y-3 transition-colors ${logo.hidden ? 'border-slate-200 bg-slate-50/60' : 'border-slate-200'}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Logo {i + 1}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${logo.hidden ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-600'}`}>
                      {logo.hidden ? 'Hidden' : 'Shown'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => update(i, { hidden: !logo.hidden })}
                      className={btnGhost}
                      aria-label={logo.hidden ? `Show logo ${i + 1} on the strip` : `Hide logo ${i + 1} from the strip`}
                    >
                      {logo.hidden ? <Eye className="w-4 h-4 text-[#1447d4]" /> : <EyeOff className="w-4 h-4" />}
                    </button>
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

        <div className="flex items-center gap-3 pt-1">
          <button onClick={() => setLogos(ls => [...ls, { url: '', name: '', hidden: false }])} className={btnGhost}>
            <Plus className="w-4 h-4" /> Add logo
          </button>
          <span className="text-xs text-slate-400">Remember to save after adding, reordering or removing.</span>
        </div>
      </Card>
    </div>
  );
}
