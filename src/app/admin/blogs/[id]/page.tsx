'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader, LoadingRows } from '../../ui';
import BlogForm, { BlogFormValues, emptyBlog } from '../BlogForm';

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<BlogFormValues | null>(null);

  useEffect(() => {
    fetch(`/api/admin/blogs/${id}`).then(r => r.json()).then(b => {
      setInitial({
        title: b.title ?? '',
        excerpt: b.excerpt ?? '',
        image: b.image ?? '',
        category: b.category ?? 'Technology',
        author: b.author ?? '',
        tags: (b.tags ?? []).join(', '),
        content: (b.content ?? []).join('\n\n'),
      });
    });
  }, [id]);

  return (
    <div>
      <PageHeader title="Edit Blog Post" subtitle="Update this article" back={{ href: '/admin/blogs', label: 'Blog Posts' }} />
      {initial === null ? (
        <div className="max-w-3xl"><LoadingRows rows={3} /></div>
      ) : (
        <BlogForm
          initial={initial ?? emptyBlog}
          submitLabel="Save Changes"
          onSubmit={async payload => {
            await fetch(`/api/admin/blogs/${id}`, {
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
