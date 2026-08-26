'use client';

import { useEffect, useState } from 'react';
import { Inbox, Trash2, Mail, Circle, CheckCircle2 } from 'lucide-react';
import { PageHeader, Card, Badge, EmptyState, LoadingRows } from '../ui';

type Enquiry = {
  id: string; name: string; email: string; subject: string; message: string;
  ip: string; ua: string; read: boolean; createdAt: string;
};

export default function AdminEnquiries() {
  const [items, setItems] = useState<Enquiry[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const load = () => fetch('/api/admin/enquiries').then(r => r.json()).then(d => setItems(d.items || []));
  useEffect(() => { load(); }, []);

  const patch = async (id: string, read: boolean) => {
    setItems(list => list?.map(i => (i.id === id ? { ...i, read } : i)) ?? list);
    await fetch('/api/admin/enquiries', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read }) });
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this enquiry?')) return;
    setItems(list => list?.filter(i => i.id !== id) ?? list);
    if (open === id) setOpen(null);
    await fetch('/api/admin/enquiries', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
  };

  const toggle = (e: Enquiry) => {
    const next = open === e.id ? null : e.id;
    setOpen(next);
    if (next && !e.read) patch(e.id, true);
  };

  const fmt = (d: string) => {
    const dt = new Date(d);
    return dt.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const unread = items?.filter(i => !i.read).length ?? 0;

  return (
    <div>
      <PageHeader
        title="Enquiries"
        subtitle="Messages submitted through the contact form"
        action={unread > 0 ? <Badge tone="blue">{unread} unread</Badge> : undefined}
      />

      {items === null ? (
        <LoadingRows rows={5} />
      ) : items.length === 0 ? (
        <EmptyState icon={<Inbox className="w-6 h-6" />} title="No enquiries yet">
          Submissions from the contact form will appear here.
        </EmptyState>
      ) : (
        <div className="space-y-3">
          {items.map(e => {
            const isOpen = open === e.id;
            return (
              <Card key={e.id} className={`overflow-hidden transition-colors ${!e.read ? 'ring-1 ring-blue-100' : ''}`}>
                <button onClick={() => toggle(e)} className="w-full flex items-center gap-4 px-5 py-4 text-left">
                  <span className={`shrink-0 ${e.read ? 'text-slate-200' : 'text-[#1447d4]'}`}>
                    {e.read ? <Circle className="w-2.5 h-2.5 fill-current" /> : <Circle className="w-2.5 h-2.5 fill-current" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`truncate text-sm ${e.read ? 'font-semibold text-slate-700' : 'font-bold text-slate-900'}`}>{e.name || 'Unknown'}</p>
                      <span className="text-slate-300">·</span>
                      <p className="truncate text-xs text-slate-400">{e.email}</p>
                    </div>
                    <p className={`truncate text-[13px] ${e.read ? 'text-slate-400' : 'text-slate-600'}`}>{e.subject}</p>
                  </div>
                  <p className="shrink-0 text-xs text-slate-400 hidden sm:block">{fmt(e.createdAt)}</p>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 py-5 bg-slate-50/50">
                    <p className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed mb-4">{e.message}</p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-slate-400 mb-4">
                      <span>{fmt(e.createdAt)}</span>
                      {e.ip && <span>IP: {e.ip}</span>}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <a href={`mailto:${e.email}?subject=Re: ${encodeURIComponent(e.subject)}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#1447d4] bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors">
                        <Mail className="w-3.5 h-3.5" /> Reply
                      </a>
                      <button onClick={() => patch(e.id, !e.read)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark {e.read ? 'unread' : 'read'}
                      </button>
                      <button onClick={() => remove(e.id)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-rose-500 bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-200 px-4 py-2 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
