'use client';

import { PageHeader } from '../../ui';
import IndustryForm, { emptyIndustry } from '../IndustryForm';

export default function NewIndustry() {
  return (
    <div>
      <PageHeader title="New Industry" subtitle="Add a sector and its use cases" back={{ href: '/admin/industries', label: 'Industries' }} />
      <IndustryForm
        initial={emptyIndustry}
        submitLabel="Publish Industry"
        onSubmit={async payload => {
          const res = await fetch('/api/admin/industries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error(res.status === 401
            ? 'Your admin session has expired. Sign in again in another tab, then publish.'
            : 'Could not publish the industry. Please try again.');
        }}
      />
    </div>
  );
}
