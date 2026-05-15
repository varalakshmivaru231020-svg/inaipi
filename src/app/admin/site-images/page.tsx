'use client';

import { useEffect, useState } from 'react';
import ImageUpload from '../components/ImageUpload';

export default function AdminSiteImages() {
  const [arch, setArch]     = useState('');
  const [desktop, setDesktop] = useState('');
  const [saving, setSaving]  = useState(false);
  const [saved, setSaved]    = useState(false);

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
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a] font-figtree">Section Images</h1>
        <p className="text-slate-400 text-sm mt-1">Upload images for the Architecture and Agent Desktop sections on the homepage.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Section</p>
          <h2 className="text-base font-bold text-[#0f172a]">Inaipi Architecture</h2>
          <p className="text-xs text-slate-400 mt-0.5">Displayed as the full-width diagram in the Architecture section. Recommended: 1200×800px, PNG or WebP.</p>
        </div>
        <ImageUpload
          label="Architecture Diagram"
          value={arch}
          onChange={setArch}
          hint="Recommended: 1200×800px, PNG or WebP"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Section</p>
          <h2 className="text-base font-bold text-[#0f172a]">Unified Workspace — The Agent Desktop</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload a screenshot of your actual agent desktop. When set, this replaces the animated demo mockup.
            Leave empty to keep the animated demo. Recommended: 1400×900px, JPG or WebP.
          </p>
        </div>
        <ImageUpload
          label="Agent Desktop Screenshot"
          value={desktop}
          onChange={setDesktop}
          hint="Recommended: 1400×900px, JPG or WebP — replaces the animated demo"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="bg-[#1447d4] hover:bg-[#0d3ab8] text-white font-black text-sm uppercase tracking-widest px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {saved && <span className="text-green-600 text-sm font-bold">Saved!</span>}
      </div>
    </div>
  );
}
