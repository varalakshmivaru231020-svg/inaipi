'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Plus, Briefcase } from 'lucide-react';
import { PageHeader, Card, Badge, EmptyState, LoadingRows, btnPrimary } from '../ui';

type Job = { id: string; slug: string; title: string; type: string; location: string; salary: string };

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/admin/jobs').then(r => r.json()).then(d => { setJobs(d); setLoading(false); });
  };
  useEffect(load, []);

  const del = async (id: string, title: string) => {
    if (!confirm(`Delete the "${title}" role?`)) return;
    await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <PageHeader
        title="Careers"
        subtitle={`${jobs.length} open ${jobs.length === 1 ? 'role' : 'roles'}`}
        action={<Link href="/admin/jobs/new" className={btnPrimary}><Plus className="w-4 h-4" /> New Role</Link>}
      />

      {loading ? (
        <LoadingRows />
      ) : jobs.length === 0 ? (
        <Card className="p-6">
          <EmptyState icon={<Briefcase className="w-6 h-6" />} title="No roles posted yet">
            <Link href="/admin/jobs/new" className="text-[#1447d4] font-bold hover:underline">Post your first job →</Link>
          </EmptyState>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs.map(j => (
            <Card key={j.id} className="p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 truncate">{j.title}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <Badge tone="blue">{j.type}</Badge>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <MapPin className="w-3 h-3" /> {j.location}
                  </span>
                  <span className="text-xs text-slate-300">·</span>
                  <span className="text-xs text-slate-400">{j.salary}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link href={`/admin/jobs/${j.id}`} className="text-xs font-bold text-slate-500 hover:text-[#1447d4] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">Edit</Link>
                <button onClick={() => del(j.id, j.title)} className="text-xs font-bold text-slate-400 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors">Delete</button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
