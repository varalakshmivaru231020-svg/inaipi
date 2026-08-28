'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2, Mail, ShieldCheck, Send } from 'lucide-react';
import { PageHeader, Card, Field, inputCls, btnPrimary, btnGhost } from '../ui';

type Settings = {
  smtp_host: string; smtp_port: string; smtp_secure: string;
  smtp_user: string; smtp_pass_set: boolean; smtp_from: string;
  enquiry_to: string; smtp_enabled: string;
};

export default function AdminEmail() {
  const [s, setS] = useState<Settings | null>(null);
  const [pass, setPass] = useState(''); // new password (blank = keep existing)
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState<'verify' | 'test' | null>(null);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  useEffect(() => { fetch('/api/admin/settings').then(r => r.json()).then(setS); }, []);

  const set = (k: keyof Settings, v: string) => setS(m => (m ? { ...m, [k]: v } : m));

  const save = async () => {
    if (!s) return;
    setSaving(true); setResult(null);
    const body: Record<string, unknown> = { ...s };
    if (pass.trim()) body.smtp_pass = pass;
    const r = await fetch('/api/admin/settings', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    setS(await r.json());
    setPass('');
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2200);
  };

  const run = async (action: 'verify' | 'test') => {
    setTesting(action); setResult(null);
    try {
      const r = await fetch('/api/admin/settings', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action }),
      });
      const d = await r.json();
      setResult({ ok: r.ok, msg: r.ok
        ? (action === 'test' ? 'Test email sent. Check the recipient inbox.' : 'Connection verified successfully.')
        : (d.error || 'Failed.') });
    } catch {
      setResult({ ok: false, msg: 'Request failed.' });
    }
    setTesting(null);
  };

  if (!s) return <div className="h-40 rounded-2xl bg-slate-100 animate-pulse" />;

  const enabled = s.smtp_enabled === 'true';

  return (
    <div>
      <PageHeader
        title="Email (SMTP)"
        subtitle="Configure Microsoft Outlook / Office 365 to deliver enquiry-form notifications"
        action={
          <button onClick={save} disabled={saving} className={btnPrimary}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
            {saving ? 'Saving…' : saved ? 'Saved' : 'Save Changes'}
          </button>
        }
      />

      <div className="max-w-2xl space-y-5">
        <Card className="p-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={enabled} onChange={e => set('smtp_enabled', e.target.checked ? 'true' : '')} className="w-4 h-4 rounded accent-[#1447d4]" />
            <div>
              <p className="text-sm font-bold text-slate-700">Enable email sending</p>
              <p className="text-xs text-slate-400">When off, enquiries are still saved but no email is sent.</p>
            </div>
          </label>
        </Card>

        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-2 text-slate-700">
            <Mail className="w-4 h-4 text-[#1447d4]" />
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">SMTP Server</p>
          </div>
          <div className="grid sm:grid-cols-[1fr_140px] gap-4">
            <Field label="Host">
              <input value={s.smtp_host} onChange={e => set('smtp_host', e.target.value)} className={inputCls} placeholder="smtp.office365.com" />
            </Field>
            <Field label="Port" hint="587 or 465">
              <input value={s.smtp_port} onChange={e => set('smtp_port', e.target.value)} className={inputCls} placeholder="587" inputMode="numeric" />
            </Field>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={s.smtp_secure === 'true'} onChange={e => set('smtp_secure', e.target.checked ? 'true' : '')} className="w-4 h-4 rounded accent-[#1447d4]" />
            <span className="text-sm font-semibold text-slate-600">Use implicit TLS (tick only for port 465; leave off for 587 STARTTLS)</span>
          </label>
        </Card>

        <Card className="p-6 space-y-5">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Credentials</p>
          <Field label="Username (email)" hint="Your full Outlook / Office 365 email address.">
            <input value={s.smtp_user} onChange={e => set('smtp_user', e.target.value)} className={inputCls} placeholder="you@yourcompany.com" autoComplete="off" />
          </Field>
          <Field label="Password" hint={s.smtp_pass_set ? 'A password is saved. Leave blank to keep it, or type a new one to replace.' : 'For Microsoft accounts with MFA, use an App Password.'}>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} className={inputCls} placeholder={s.smtp_pass_set ? '••••••••••  (unchanged)' : 'Enter SMTP password'} autoComplete="new-password" />
          </Field>
        </Card>

        <Card className="p-6 space-y-5">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Delivery</p>
          <Field label="From address" hint="Usually the same as the username. Must be an address the account is allowed to send as.">
            <input value={s.smtp_from} onChange={e => set('smtp_from', e.target.value)} className={inputCls} placeholder="you@yourcompany.com" />
          </Field>
          <Field label="Send enquiries to" hint="Where new enquiry notifications are delivered.">
            <input value={s.enquiry_to} onChange={e => set('enquiry_to', e.target.value)} className={inputCls} placeholder="sales@yourcompany.com" />
          </Field>
        </Card>

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => run('verify')} disabled={!!testing} className={btnGhost}>
            {testing === 'verify' ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            Verify connection
          </button>
          <button onClick={() => run('test')} disabled={!!testing} className={btnGhost}>
            {testing === 'test' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Send test email
          </button>
          <span className="text-xs text-slate-400">Save your changes before testing.</span>
        </div>

        {result && (
          <div className={`rounded-xl px-4 py-3 text-sm font-semibold ${result.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
            {result.msg}
          </div>
        )}
      </div>
    </div>
  );
}
