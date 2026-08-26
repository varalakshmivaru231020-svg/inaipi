'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2, BarChart3 } from 'lucide-react';
import { PageHeader, Card, Field, inputCls, btnPrimary } from '../ui';

export default function AdminAnalytics() {
  const [gaId, setGaId] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(d => { setGaId(d.ga_id || ''); setLoaded(true); });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/settings', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ga_id: gaId.trim() }),
    });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2200);
  };

  const valid = gaId.trim() === '' || /^G-[A-Z0-9]{6,}$/i.test(gaId.trim());

  return (
    <div>
      <PageHeader
        title="Google Analytics"
        subtitle="Track site traffic with Google Analytics 4"
        action={
          <button onClick={save} disabled={saving || !valid} className={btnPrimary}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
            {saving ? 'Saving…' : saved ? 'Saved' : 'Save Changes'}
          </button>
        }
      />

      <div className="max-w-2xl">
        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-2 text-slate-700">
            <BarChart3 className="w-4 h-4 text-[#1447d4]" />
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Measurement ID</p>
          </div>

          {loaded ? (
            <Field
              label="GA4 Measurement ID"
              hint="Find it in Google Analytics → Admin → Data Streams → your web stream. Leave blank to disable tracking."
            >
              <input
                value={gaId}
                onChange={e => setGaId(e.target.value)}
                className={inputCls}
                placeholder="G-XXXXXXXXXX"
                autoComplete="off"
              />
            </Field>
          ) : (
            <div className="h-11 rounded-xl bg-slate-100 animate-pulse" />
          )}

          {!valid && (
            <p className="text-xs font-semibold text-rose-500">Measurement IDs look like <span className="font-mono">G-XXXXXXXXXX</span>.</p>
          )}

          <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-xs text-slate-500 leading-relaxed">
            When set, the Google Analytics tag is injected on every public page. Changes take effect on the next page load
            {gaId.trim() ? <>. Tracking is <span className="font-bold text-emerald-600">active</span>.</> : <>. Tracking is <span className="font-bold text-slate-500">off</span>.</>}
          </div>
        </Card>
      </div>
    </div>
  );
}
