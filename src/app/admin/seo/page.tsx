'use client';

import { useEffect, useState } from 'react';
import { Check, Globe, Loader2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { PageHeader, Card, Field, inputCls, btnPrimary, Badge } from '../ui';
import ImageUpload from '../components/ImageUpload';
import type { SeoEntry, SeoPage } from '@/lib/seoPages';

type PageWithSeo = SeoPage & { seo: SeoEntry };

const SITE = 'https://inaipi.zapeat.in';

export default function AdminSeo() {
  const [pages, setPages] = useState<SeoPage[]>([]);
  const [values, setValues] = useState<Record<string, SeoEntry>>({});
  const [active, setActive] = useState('home');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/seo').then(r => r.json()).then((d: { pages: PageWithSeo[] }) => {
      setPages(d.pages.map(({ seo, ...p }) => p));
      const map: Record<string, SeoEntry> = {};
      d.pages.forEach(p => { map[p.key] = p.seo; });
      setValues(map);
    });
  }, []);

  const cur = values[active];
  const set = (k: keyof SeoEntry, v: string | boolean) =>
    setValues(m => ({ ...m, [active]: { ...m[active], [k]: v } }));

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/seo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const activePage = pages.find(p => p.key === active);

  return (
    <div>
      <PageHeader
        title="SEO Settings"
        subtitle="Manage titles, meta descriptions and social sharing for every page"
        action={
          <button onClick={save} disabled={saving || !cur} className={btnPrimary}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
            {saving ? 'Saving…' : saved ? 'Saved' : 'Save Changes'}
          </button>
        }
      />

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        {/* Page list */}
        <Card className="p-2 h-fit">
          {pages.map(p => {
            const on = p.key === active;
            return (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm font-semibold transition-colors ${
                  on ? 'bg-blue-50 text-[#1447d4]' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Globe className={`w-4 h-4 shrink-0 ${on ? 'text-[#1447d4]' : 'text-slate-300'}`} />
                <span className="flex-1 truncate">{p.label}</span>
                {values[p.key]?.noindex && <Badge tone="amber">noindex</Badge>}
              </button>
            );
          })}
        </Card>

        {/* Editor */}
        {cur && (
          <div className="space-y-5">
            {/* Google preview */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Search Preview</p>
                {activePage && (
                  <Link href={activePage.path} target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-[#1447d4]">
                    {activePage.path} <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
              <div className="max-w-xl">
                <p className="text-[13px] text-emerald-700">{SITE}{activePage?.path === '/' ? '' : activePage?.path}</p>
                <p className="text-[#1a0dab] text-lg leading-tight truncate mt-0.5">{cur.title || 'Page title'}</p>
                <p className="text-sm text-slate-600 leading-snug mt-1 line-clamp-2">{cur.description || 'Meta description preview appears here.'}</p>
              </div>
            </Card>

            <Card className="p-6 space-y-5">
              <Field label="Meta Title" required hint={`${(cur.title || '').length} characters · aim for 50–60`}>
                <input value={cur.title ?? ''} onChange={e => set('title', e.target.value)} className={inputCls} placeholder="Page title for search engines" />
              </Field>
              <Field label="Meta Description" required hint={`${(cur.description || '').length} characters · aim for 150–160`}>
                <textarea value={cur.description ?? ''} onChange={e => set('description', e.target.value)} rows={3} className={`${inputCls} resize-none`} placeholder="Short summary shown in search results" />
              </Field>
              <Field label="Keywords" hint="Comma-separated (optional).">
                <input value={cur.keywords ?? ''} onChange={e => set('keywords', e.target.value)} className={inputCls} placeholder="AI, customer experience, contact center" />
              </Field>
              <Field label="Canonical URL" hint="Leave blank to use the page's own URL.">
                <input value={cur.canonical ?? ''} onChange={e => set('canonical', e.target.value)} className={inputCls} placeholder={`${SITE}${activePage?.path ?? ''}`} />
              </Field>
            </Card>

            <Card className="p-6 space-y-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Social Sharing (Open Graph / Twitter)</p>
              <Field label="Social Title" hint="Falls back to the meta title if empty.">
                <input value={cur.ogTitle ?? ''} onChange={e => set('ogTitle', e.target.value)} className={inputCls} placeholder="Title when shared on social media" />
              </Field>
              <Field label="Social Description" hint="Falls back to the meta description if empty.">
                <textarea value={cur.ogDescription ?? ''} onChange={e => set('ogDescription', e.target.value)} rows={2} className={`${inputCls} resize-none`} placeholder="Description shown in social previews" />
              </Field>
              <ImageUpload label="Social Share Image" value={cur.ogImage ?? ''} onChange={url => set('ogImage', url)} hint="Recommended 1200×630px — shown on Facebook, LinkedIn, X, etc." />
            </Card>

            <Card className="p-5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={!!cur.noindex} onChange={e => set('noindex', e.target.checked)} className="w-4 h-4 rounded accent-[#1447d4]" />
                <div>
                  <p className="text-sm font-bold text-slate-700">Hide from search engines (noindex)</p>
                  <p className="text-xs text-slate-400">Tells Google &amp; others not to index this page.</p>
                </div>
              </label>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
