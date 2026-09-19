'use client';

import { useEffect, useState } from 'react';
import { Plus, Quote, Star, Eye, EyeOff, BadgeCheck } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import { PageHeader, Card, Field, inputCls, btnPrimary, btnGhost, EmptyState, LoadingRows } from '../ui';

type T = { id: string; name: string; role: string; quote: string; avatar: string; stat: string; statLabel: string; stars: number; hidden: boolean };
const blank = (): Omit<T, 'id'> => ({ name: '', role: '', quote: '', avatar: '', stat: '', statLabel: '', stars: 5, hidden: false });

/* The switch used for the two whole-section controls. */
function Switch({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${on ? 'bg-[#1447d4]' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? 'left-6' : 'left-1'}`} />
    </button>
  );
}

export default function AdminTestimonials() {
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<T | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blank());
  const [saving, setSaving] = useState(false);

  const load = () => fetch('/api/admin/testimonials').then(r => r.json()).then(d => { setList(d); setLoading(false); });

  /* The two whole-section switches, kept in the existing settings store. */
  const [shown, setShown] = useState<boolean | null>(null);
  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => setShown(d.show_testimonials !== false))
      .catch(() => setShown(true));
  }, []);

  const setSection = async (on: boolean) => {
    setShown(on);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ show_testimonials: String(on) }),
    });
  };

  /* Hiding a review takes it off the site on its own, leaving whether it is
     it in the admin, so it can go back up without being retyped. */
  const toggleHidden = async (t: T) => {
    setList(l => l.map(x => (x.id === t.id ? { ...x, hidden: !x.hidden } : x)));
    await fetch(`/api/admin/testimonials/${t.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hidden: !t.hidden }),
    });
    load();
  };

  useEffect(() => { load(); }, []);

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    if (editing) {
      await fetch(`/api/admin/testimonials/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setSaving(false);
    cancel();
    load();
  };

  const del = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    load();
  };

  const startEdit = (t: T) => { setEditing(t); setForm({ name: t.name, role: t.role, quote: t.quote, avatar: t.avatar, stat: t.stat, statLabel: t.statLabel, stars: t.stars, hidden: t.hidden }); setAdding(false); };
  const startAdd = () => { setAdding(true); setEditing(null); setForm(blank()); };
  const cancel = () => { setEditing(null); setAdding(false); setForm(blank()); };

  const showForm = editing !== null || adding;

  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle={`${list.length} ${list.length === 1 ? 'review' : 'reviews'}`}
        action={!showForm ? <button onClick={startAdd} className={btnPrimary}><Plus className="w-4 h-4" /> Add Review</button> : undefined}
      />

      {/* Whether the whole section appears on the home page */}
      <Card className="p-5 mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Website visibility</p>
        <div className="flex items-center gap-4">
          <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${shown !== false ? 'bg-blue-50 text-[#1447d4]' : 'bg-slate-100 text-slate-400'}`}>
            <Quote className="w-5 h-5" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800">Testimonials section</p>
            <p className="text-xs text-slate-400 mt-0.5">The heading and every review on the home page</p>
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 ${shown !== false ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
            {shown !== false ? 'Shown' : 'Hidden'}
          </span>
          <Switch on={shown !== false} onClick={() => setSection(shown === false)} label="Show the testimonials section on the website" />
        </div>
        {shown === null && <p className="text-xs text-slate-400 mt-3">Loading…</p>}
      </Card>

      {showForm && (
        <Card className="p-6 mb-6">
          <h2 className="font-bold text-slate-800 mb-5">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name"><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Dr. Sarah Al Mansouri" className={inputCls} /></Field>
            <Field label="Role"><input value={form.role} onChange={e => set('role', e.target.value)} placeholder="CDO · Company Name" className={inputCls} /></Field>
            <Field label="Stat (e.g. 94%)"><input value={form.stat} onChange={e => set('stat', e.target.value)} className={inputCls} /></Field>
            <Field label="Stat Label"><input value={form.statLabel} onChange={e => set('statLabel', e.target.value)} placeholder="CSAT Score" className={inputCls} /></Field>
            <Field label="Stars (1-5)">
              <select value={form.stars} onChange={e => set('stars', Number(e.target.value))} className={inputCls}>
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </Field>
            <Field label="Visibility">
              <select value={form.hidden ? 'hidden' : 'shown'} onChange={e => setForm(f => ({ ...f, hidden: e.target.value === 'hidden' }))} className={inputCls}>
                <option value="shown">Shown on the website</option>
                <option value="hidden">Hidden from the website</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <ImageUpload label="Avatar" value={form.avatar} onChange={url => set('avatar', url)} hint="Square image, min 100×100px" />
            </div>
            <div className="sm:col-span-2">
              <Field label="Quote"><textarea value={form.quote} onChange={e => set('quote', e.target.value)} rows={3} placeholder="Customer testimonial…" className={`${inputCls} resize-none`} /></Field>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} disabled={saving} className={btnPrimary}>{saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Testimonial'}</button>
            <button onClick={cancel} className={btnGhost}>Cancel</button>
          </div>
        </Card>
      )}

      {loading ? (
        <LoadingRows />
      ) : list.length === 0 && !showForm ? (
        <Card className="p-6"><EmptyState icon={<Quote className="w-6 h-6" />} title="No testimonials yet"><button onClick={startAdd} className="text-[#1447d4] font-bold hover:underline">Add your first review →</button></EmptyState></Card>
      ) : (
        <div className="space-y-3">
          {list.map(t => (
            <Card key={t.id} className="p-5 flex items-start gap-4">
              {t.avatar
                ? <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
                : <div className="w-11 h-11 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center shrink-0"><Quote className="w-5 h-5" /></div>}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800">{t.name}</p>
                <p className="text-xs text-slate-400 mb-1">{t.role}</p>
                <p className="text-sm text-slate-500 line-clamp-2">{t.quote}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="inline-flex items-center gap-0.5 text-amber-400">{Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}</span>
                  {t.stat && <span className="text-xs font-bold text-violet-600">{t.stat} {t.statLabel}</span>}
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${t.hidden ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-600'}`}>
                    {t.hidden ? 'Hidden' : 'Shown'}
                  </span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => toggleHidden(t)}
                  aria-label={t.hidden ? `Show ${t.name} on the website` : `Hide ${t.name} from the website`}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5 ${t.hidden ? 'text-[#1447d4] hover:bg-blue-50' : 'text-slate-500 hover:text-amber-600 hover:bg-amber-50'}`}
                >
                  {t.hidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {t.hidden ? 'Show' : 'Hide'}
                </button>
                <button onClick={() => startEdit(t)} className="text-xs font-bold text-slate-500 hover:text-violet-600 px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors">Edit</button>
                <button onClick={() => del(t.id, t.name)} className="text-xs font-bold text-slate-400 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors">Delete</button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
