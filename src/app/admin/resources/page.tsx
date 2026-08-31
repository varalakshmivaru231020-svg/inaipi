'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Download, Plus, FileText, Paperclip } from 'lucide-react';
import { PageHeader, Card, Badge, EmptyState, LoadingRows, btnPrimary } from '../ui';
import { toDocuments } from '@/lib/richtext';

type Resource = { id: string; slug: string; title: string; category: string; excerpt: string; image?: string; documents?: unknown };

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/admin/resources', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => { setResources(Array.isArray(d) ? d : []); setLoading(false); });
  };
  useEffect(load, []);

  const del = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch(`/api/admin/resources/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <PageHeader
        title="Buyer Resources"
        subtitle={`${resources.length} ${resources.length === 1 ? 'resource' : 'resources'}`}
        action={<Link href="/admin/resources/new" className={btnPrimary}><Plus className="w-4 h-4" /> New Resource</Link>}
      />

      {loading ? (
        <LoadingRows />
      ) : resources.length === 0 ? (
        <Card className="p-6">
          <EmptyState icon={<Download className="w-6 h-6" />} title="No resources yet">
            <Link href="/admin/resources/new" className="text-[#1447d4] font-bold hover:underline">Publish your first resource →</Link>
          </EmptyState>
        </Card>
      ) : (
        <div className="space-y-3">
          {resources.map(r => {
            const docs = toDocuments(r.documents);
            return (
              <Card key={r.id} className="p-4 flex items-center gap-4">
                <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                  {r.image
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={r.image} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-slate-300"><FileText className="w-4 h-4" /></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 truncate">{r.title}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    {r.category && <Badge tone="blue">{r.category}</Badge>}
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <Paperclip className="w-3 h-3" /> {docs.length} {docs.length === 1 ? 'document' : 'documents'}
                    </span>
                    <span className="text-xs text-slate-400">/resources/{r.slug}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <a href={`/resources/${r.slug}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-500 hover:text-[#1447d4] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">View</a>
                  <Link href={`/admin/resources/${r.id}`} className="text-xs font-bold text-slate-500 hover:text-[#1447d4] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">Edit</Link>
                  <button onClick={() => del(r.id, r.title)} className="text-xs font-bold text-slate-400 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors">Delete</button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
