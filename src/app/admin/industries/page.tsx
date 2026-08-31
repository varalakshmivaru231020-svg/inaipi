'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Factory, Plus, Tag } from 'lucide-react';
import { PageHeader, Card, Badge, EmptyState, LoadingRows, btnPrimary } from '../ui';
import { industryIcon } from '@/lib/industryIcons';

type Industry = { id: string; slug: string; name: string; sub: string; icon: string; useCases: string[] };

export default function AdminIndustries() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/admin/industries').then(r => r.json()).then(d => { setIndustries(d); setLoading(false); });
  };
  useEffect(load, []);

  const del = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    await fetch(`/api/admin/industries/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <PageHeader
        title="Industries"
        subtitle={`${industries.length} ${industries.length === 1 ? 'sector' : 'sectors'}`}
        action={<Link href="/admin/industries/new" className={btnPrimary}><Plus className="w-4 h-4" /> New Industry</Link>}
      />

      {loading ? (
        <LoadingRows />
      ) : industries.length === 0 ? (
        <Card className="p-6">
          <EmptyState icon={<Factory className="w-6 h-6" />} title="No industries yet">
            <Link href="/admin/industries/new" className="text-[#1447d4] font-bold hover:underline">Add your first sector →</Link>
          </EmptyState>
        </Card>
      ) : (
        <div className="space-y-3">
          {industries.map(n => {
            const Icon = industryIcon(n.icon);
            return (
              <Card key={n.id} className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1447d4] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 truncate">{n.name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    {n.sub && <Badge tone="blue">{n.sub}</Badge>}
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400"><Tag className="w-3 h-3" /> {n.useCases.length} use cases</span>
                    <span className="text-xs text-slate-400">/industries/{n.slug}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <a href={`/industries/${n.slug}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-500 hover:text-[#1447d4] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">View</a>
                  <Link href={`/admin/industries/${n.id}`} className="text-xs font-bold text-slate-500 hover:text-[#1447d4] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">Edit</Link>
                  <button onClick={() => del(n.id, n.name)} className="text-xs font-bold text-slate-400 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors">Delete</button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
