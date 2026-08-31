import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeHtml, toDocuments } from '@/lib/richtext';

export const dynamic = 'force-dynamic';

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function uniqueSlug(base: string, excludeId: string) {
  const root = base || 'resource';
  let slug = root;
  let n = 2;
  while (await prisma.resource.findFirst({ where: { slug, NOT: { id: excludeId } } })) {
    slug = `${root}-${n++}`;
  }
  return slug;
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const resource = await prisma.resource.findUnique({ where: { id: params.id } });
  if (!resource) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(resource, { headers: { 'Cache-Control': 'no-store' } });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const b = await req.json();
  const existing = await prisma.resource.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const slug = b.slug ? await uniqueSlug(slugify(String(b.slug)), params.id) : existing.slug;
  const resource = await prisma.resource.update({
    where: { id: params.id },
    data: {
      slug,
      ...(b.title !== undefined && { title: b.title }),
      ...(b.excerpt !== undefined && { excerpt: b.excerpt }),
      ...(b.image !== undefined && { image: b.image }),
      ...(b.category !== undefined && { category: b.category }),
      ...(b.html !== undefined && { html: sanitizeHtml(String(b.html)) }),
      ...(Array.isArray(b.content) && { content: b.content }),
      ...(b.documents !== undefined && { documents: toDocuments(b.documents) }),
    },
  });
  return NextResponse.json(resource);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.resource.delete({ where: { id: params.id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
