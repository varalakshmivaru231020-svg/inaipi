'use client';

import { PageHeader } from '../../ui';
import ResourceForm, { emptyResource } from '../ResourceForm';

export default function NewResource() {
  return (
    <div>
      <PageHeader title="New Buyer Resource" subtitle="Publish a downloadable asset" back={{ href: '/admin/resources', label: 'Buyer Resources' }} />
      <ResourceForm
        initial={emptyResource}
        submitLabel="Publish Resource"
        onSubmit={async payload => {
          const res = await fetch('/api/admin/resources', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error(res.status === 401
            ? 'Your admin session has expired. Sign in again in another tab, then publish.'
            : 'Could not publish the resource. Please try again.');
        }}
      />
    </div>
  );
}
