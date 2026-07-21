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
          await fetch('/api/admin/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        }}
      />
    </div>
  );
}
