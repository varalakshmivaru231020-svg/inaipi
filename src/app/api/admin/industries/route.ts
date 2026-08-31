import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeHtml, toDocuments } from '@/lib/richtext';

export const dynamic = 'force-dynamic';

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function uniqueSlug(base: string, excludeId?: string) {
  const root = base || 'industry';
  let slug = root;
  let n = 2;
  while (await prisma.industry.findFirst({ where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) } })) {
    slug = `${root}-${n++}`;
  }
  return slug;
}

export async function GET() {
  const industries = await prisma.industry.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(industries);
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  const slug = await uniqueSlug(slugify(String(b.slug || b.name || 'industry')));
  const industry = await prisma.industry.create({
    data: {
      slug,
      name: b.name ?? '',
      sub: b.sub ?? '',
      icon: b.icon ?? 'Building2',
      desc: b.desc ?? '',
      useCases: Array.isArray(b.useCases) ? b.useCases : [],
      content: Array.isArray(b.content) ? b.content : [],
      html: sanitizeHtml(String(b.html ?? '')),
      documents: toDocuments(b.documents),
      iconUrl: b.iconUrl ?? '',
    },
  });
  return NextResponse.json(industry, { status: 201 });
}
