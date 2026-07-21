'use client';

import { PageHeader } from '../../ui';
import JobForm, { emptyJob } from '../JobForm';

export default function NewJob() {
  return (
    <div>
      <PageHeader title="New Role" subtitle="Add a career opening" back={{ href: '/admin/jobs', label: 'Careers' }} />
      <JobForm
        initial={emptyJob}
        submitLabel="Publish Role"
        onSubmit={async payload => {
          await fetch('/api/admin/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        }}
      />
    </div>
  );
}
