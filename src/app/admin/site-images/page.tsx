'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import CustomerLogos from '../components/CustomerLogos';
import { PageHeader, Card, btnPrimary } from '../ui';

export default function AdminSiteImages() {
  const [arch, setArch] = useState('');
  const [desktop, setDesktop] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/site-images').then(r => r.json()).then(d => {
      setArch(d.architectureImage ?? '/arch1.png');
      setDesktop(d.agentDesktopImage ?? '');
    });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/site-images', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ architectureImage: arch, agentDesktopImage: desktop }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <PageHeader
        title="Section Images"
        subtitle="Images used by homepage sections"
        action={
          <button onClick={save} disabled={saving} className={btnPrimary}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
            {saving ? 'Saving…' : saved ? 'Saved' : 'Save Changes'}
          </button>
        }
      />

      <div className="space-y-5 max-w-3xl">
        <Card className="p-6 space-y-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Section</p>
            <h2 className="text-base font-bold text-slate-800">Inaipi Architecture</h2>
            <p className="text-xs text-slate-400 mt-0.5">Full-width diagram in the Architecture section. Recommended: 1200×800px, PNG or WebP.</p>
          </div>
          <ImageUpload label="Architecture Diagram" value={arch} onChange={setArch} hint="Recommended: 1200×800px, PNG or WebP" />
        </Card>

        <Card className="p-6 space-y-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Section</p>
            <h2 className="text-base font-bold text-slate-800">Unified Workspace</h2>
            <p className="text-xs text-slate-400 mt-0.5">Upload a screenshot of your agent desktop to replace the animated demo. Leave empty to keep the animated demo. Recommended: 1400×900px.</p>
          </div>
          <ImageUpload label="Unified Workspace Screenshot" value={desktop} onChange={setDesktop} hint="Recommended: 1400×900px, JPG or WebP, replaces the animated demo" />
        </Card>

        <CustomerLogos />
      </div>
    </div>
  );
}
