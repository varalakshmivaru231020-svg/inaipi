import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeHtml, toDocuments } from '@/lib/richtext';

export const dynamic = 'force-dynamic';

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function uniqueSlug(base: string, excludeId?: string) {
  const root = base || 'resource';
  let slug = root;
  let n = 2;
  while (await prisma.resource.findFirst({ where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) } })) {
    slug = `${root}-${n++}`;
  }
  return slug;
}

export async function GET() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(resources, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  const slug = await uniqueSlug(slugify(String(b.slug || b.title || 'resource')));
  const resource = await prisma.resource.create({
    data: {
      slug,
      title: b.title ?? '',
      excerpt: b.excerpt ?? '',
      image: b.image ?? '',
      category: b.category ?? '',
      html: sanitizeHtml(String(b.html ?? '')),
      content: Array.isArray(b.content) ? b.content : [],
      documents: toDocuments(b.documents),
    },
  });
  return NextResponse.json(resource, { status: 201 });
}
