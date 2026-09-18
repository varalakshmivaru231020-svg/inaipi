'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2, Download } from 'lucide-react';
import { PageHeader, Card, btnPrimary } from '../ui';

/**
 * Whether a document download asks the visitor for their details first.
 *
 * Turned on, the reader gives their name, work email, company and phone number
 * and the submission lands in Enquiries with the rest. Turned off, the file is
 * handed over on the first click. It is set per section, because a gated white
 * paper and an ungated blog attachment are both reasonable things to want.
 */

type Gates = {
  lead_gate_blog: boolean;
  lead_gate_resource: boolean;
  lead_gate_industry: boolean;
};

const ROWS: { key: keyof Gates; label: string; hint: string }[] = [
  { key: 'lead_gate_blog', label: 'Blog posts', hint: 'Documents attached to a blog post' },
  { key: 'lead_gate_resource', label: 'Buyer Resources', hint: 'Documents on a Buyer Resource page' },
  { key: 'lead_gate_industry', label: 'Industries', hint: 'Documents on an industry page' },
];

export default function AdminDownloads() {
  const [g, setG] = useState<Gates | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => setG({
        lead_gate_blog: d.lead_gate_blog !== false,
        lead_gate_resource: d.lead_gate_resource !== false,
        lead_gate_industry: d.lead_gate_industry !== false,
      }));
  }, []);

  const save = async (next: Gates) => {
    setG(next);
    setSaving(true);
    // stored as strings, and only an explicit 'false' turns a gate off
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_gate_blog: String(next.lead_gate_blog),
        lead_gate_resource: String(next.lead_gate_resource),
        lead_gate_industry: String(next.lead_gate_industry),
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div>
      <PageHeader
        title="Downloads"
        subtitle="Ask for a visitor's details before handing over a document"
      />

      <Card className="p-6">
        {!g ? (
          <div className="flex items-center gap-2 text-slate-400 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {ROWS.map(row => (
              <div key={row.key} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#1447d4] flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800">{row.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{row.hint}</p>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 ${g[row.key] ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                  {g[row.key] ? 'Asking' : 'Off'}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={g[row.key]}
                  aria-label={`Capture lead details for ${row.label}`}
                  onClick={() => save({ ...g, [row.key]: !g[row.key] })}
                  className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${g[row.key] ? 'bg-[#1447d4]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${g[row.key] ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
          <button type="button" disabled className={`${btnPrimary} opacity-0 pointer-events-none hidden`}>save</button>
          {saving && <span className="text-xs text-slate-400 flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</span>}
          {saved && <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Saved</span>}
          {!saving && !saved && <p className="text-xs text-slate-400">Changes save as soon as you switch one.</p>}
        </div>
      </Card>
    </div>
  );
}
