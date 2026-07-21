'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader, LoadingRows } from '../../ui';
import JobForm, { JobFormValues, emptyJob } from '../JobForm';

const fromLines = (a: unknown) => (Array.isArray(a) ? a.join('\n') : '');

export default function EditJob() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<JobFormValues | null>(null);

  useEffect(() => {
    fetch(`/api/admin/jobs/${id}`).then(r => r.json()).then(j => {
      setInitial({
        title: j.title ?? '',
        type: j.type ?? 'Full time',
        location: j.location ?? '',
        salary: j.salary ?? 'Competitive',
        slug: j.slug ?? '',
        desc: j.desc ?? '',
        responsibilities: fromLines(j.responsibilities),
        requirements: fromLines(j.requirements),
        offers: fromLines(j.offers),
      });
    });
  }, [id]);

  return (
    <div>
      <PageHeader title="Edit Role" subtitle="Update this career opening" back={{ href: '/admin/jobs', label: 'Careers' }} />
      {initial === null ? (
        <div className="max-w-3xl"><LoadingRows rows={3} /></div>
      ) : (
        <JobForm
          initial={initial ?? emptyJob}
          submitLabel="Save Changes"
          onSubmit={async payload => {
            await fetch(`/api/admin/jobs/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
          }}
        />
      )}
    </div>
  );
}
