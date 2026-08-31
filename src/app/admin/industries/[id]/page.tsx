'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader, LoadingRows } from '../../ui';
import IndustryForm, { IndustryFormValues, emptyIndustry } from '../IndustryForm';
import { toDocuments } from '@/lib/richtext';

export default function EditIndustry() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<IndustryFormValues | null>(null);

  useEffect(() => {
    fetch(`/api/admin/industries/${id}`, { cache: 'no-store' }).then(r => r.json()).then(n => {
      setInitial({
        name: n.name ?? '',
        sub: n.sub ?? '',
        icon: n.icon ?? 'Building2',
        iconUrl: n.iconUrl ?? '',
        desc: n.desc ?? '',
        useCases: (n.useCases ?? []).join(', '),
        // sectors written before the rich editor keep their paragraphs
        html: n.html || (n.content ?? []).map((p: string) => `<p>${p}</p>`).join(''),
        documents: toDocuments(n.documents),
      });
    });
  }, [id]);

  return (
    <div>
      <PageHeader title="Edit Industry" subtitle="Update this sector" back={{ href: '/admin/industries', label: 'Industries' }} />
      {initial === null ? (
        <div className="max-w-3xl"><LoadingRows rows={3} /></div>
      ) : (
        <IndustryForm
          initial={initial ?? emptyIndustry}
          submitLabel="Save Changes"
          onSubmit={async payload => {
            const res = await fetch(`/api/admin/industries/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(res.status === 401
              ? 'Your admin session has expired. Sign in again in another tab, then save.'
              : 'Could not save your changes. Please try again.');
          }}
        />
      )}
    </div>
  );
}
