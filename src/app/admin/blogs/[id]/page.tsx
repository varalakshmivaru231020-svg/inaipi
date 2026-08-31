'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader, LoadingRows } from '../../ui';
import BlogForm, { BlogFormValues, emptyBlog } from '../BlogForm';
import { toDocuments } from '@/lib/richtext';

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<BlogFormValues | null>(null);

  useEffect(() => {
    fetch(`/api/admin/blogs/${id}`, { cache: 'no-store' }).then(r => r.json()).then(b => {
      setInitial({
        title: b.title ?? '',
        excerpt: b.excerpt ?? '',
        image: b.image ?? '',
        category: b.category ?? 'Technology',
        author: b.author ?? '',
        tags: (b.tags ?? []).join(', '),
        // posts written before the rich editor have only the paragraph array,
        // so those paragraphs become the starting HTML rather than being lost
        html: b.html || (b.content ?? []).map((p: string) => `<p>${p}</p>`).join(''),
        documents: toDocuments(b.documents),
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
            const res = await fetch(`/api/admin/blogs/${id}`, {
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
