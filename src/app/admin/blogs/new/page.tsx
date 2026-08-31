'use client';

import { PageHeader } from '../../ui';
import BlogForm, { emptyBlog } from '../BlogForm';

export default function NewBlog() {
  return (
    <div>
      <PageHeader title="New Blog Post" subtitle="Write and publish an article" back={{ href: '/admin/blogs', label: 'Blog Posts' }} />
      <BlogForm
        initial={emptyBlog}
        submitLabel="Publish Post"
        onSubmit={async payload => {
          const res = await fetch('/api/admin/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error(res.status === 401
            ? 'Your admin session has expired. Sign in again in another tab, then publish.'
            : 'Could not publish the post. Please try again.');
        }}
      />
    </div>
  );
}
