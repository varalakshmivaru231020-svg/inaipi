'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader, LoadingRows } from '../../ui';
import ResourceForm, { ResourceFormValues, emptyResource } from '../ResourceForm';
import { toDocuments } from '@/lib/richtext';

export default function EditResource() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<ResourceFormValues | null>(null);

  useEffect(() => {
    fetch(`/api/admin/resources/${id}`, { cache: 'no-store' }).then(r => r.json()).then(r => {
      setInitial({
        title: r.title ?? '',
        excerpt: r.excerpt ?? '',
        image: r.image ?? '',
        category: r.category ?? 'Brochure',
        html: r.html || (r.content ?? []).map((p: string) => `<p>${p}</p>`).join(''),
        documents: toDocuments(r.documents),
      });
    });
  }, [id]);

  return (
    <div>
      <PageHeader title="Edit Buyer Resource" subtitle="Update this resource" back={{ href: '/admin/resources', label: 'Buyer Resources' }} />
      {initial === null ? (
        <div className="max-w-3xl"><LoadingRows rows={3} /></div>
      ) : (
        <ResourceForm
          initial={initial ?? emptyResource}
          submitLabel="Save Changes"
          onSubmit={async payload => {
            const res = await fetch(`/api/admin/resources/${id}`, {
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
