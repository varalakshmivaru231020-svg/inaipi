'use client';

import { useEffect, useState } from 'react';
import ImageUpload from '../components/ImageUpload';

type T = { id: string; name: string; role: string; quote: string; avatar: string; stat: string; statLabel: string; stars: number };
const blank = (): Omit<T, 'id'> => ({ name:'', role:'', quote:'', avatar:'', stat:'', statLabel:'', stars:5 });

export default function AdminTestimonials() {
  const [list, setList]       = useState<T[]>([]);
  const [editing, setEditing] = useState<T | null>(null);
  const [adding, setAdding]   = useState(false);
  const [form, setForm]       = useState(blank());
  const [saving, setSaving]   = useState(false);

  const load = () => fetch('/api/admin/testimonials').then(r => r.json()).then(setList);
  useEffect(() => { load(); }, []);

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    if (editing) {
      await fetch(`/api/admin/testimonials/${editing.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/admin/testimonials', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
    }
    setSaving(false);
    setEditing(null);
    setAdding(false);
    setForm(blank());
    load();
  };

  const del = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    load();
  };

  const startEdit = (t: T) => { setEditing(t); setForm({ name:t.name, role:t.role, quote:t.quote, avatar:t.avatar, stat:t.stat, statLabel:t.statLabel, stars:t.stars }); setAdding(false); };
  const startAdd  = ()     => { setAdding(true); setEditing(null); setForm(blank()); };
  const cancel    = ()     => { setEditing(null); setAdding(false); setForm(blank()); };

  const showForm = editing !== null || adding;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a] font-figtree">Testimonials</h1>
          <p className="text-slate-400 text-sm">{list.length} reviews</p>
        </div>
        {!showForm && (
          <button onClick={startAdd}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl transition-colors">
            + Add Review
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-6">
          <h2 className="font-bold text-[#0f172a] mb-4">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name"><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Dr. Sarah Al Mansouri" className={inp} /></Field>
            <Field label="Role"><input value={form.role} onChange={e => set('role', e.target.value)} placeholder="CDO · Company Name" className={inp} /></Field>
            <Field label="Stat (e.g. 94%)"><input value={form.stat} onChange={e => set('stat', e.target.value)} className={inp} /></Field>
            <Field label="Stat Label"><input value={form.statLabel} onChange={e => set('statLabel', e.target.value)} placeholder="CSAT Score" className={inp} /></Field>
            <Field label="Stars (1-5)">
              <select value={form.stars} onChange={e => set('stars', Number(e.target.value))} className={inp}>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <ImageUpload label="Avatar" value={form.avatar} onChange={url => set('avatar', url)} hint="Square image, min 100×100px" />
            </div>
          </div>
          <Field label="Quote">
            <textarea value={form.quote} onChange={e => set('quote', e.target.value)} rows={3} placeholder="Customer testimonial..." className={`${inp} mt-4`} />
          </Field>
          <div className="flex gap-3 mt-4">
            <button onClick={save} disabled={saving}
              className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black text-sm uppercase tracking-widest px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Testimonial'}
            </button>
            <button onClick={cancel} className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {list.map(t => (
          <div key={t.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
            {t.avatar && <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#0f172a]">{t.name}</p>
              <p className="text-xs text-slate-400 mb-1">{t.role}</p>
              <p className="text-sm text-slate-500 line-clamp-2">{t.quote}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-yellow-400">{'★'.repeat(t.stars)}</span>
                <span className="text-xs font-bold text-[#7c3aed]">{t.stat} {t.statLabel}</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(t)} className="text-xs font-bold text-slate-500 hover:text-[#7c3aed] px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors">Edit</button>
              <button onClick={() => del(t.id, t.name)} className="text-xs font-bold text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inp = 'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0f172a] focus:outline-none focus:border-[#7c3aed] transition-colors resize-none';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
