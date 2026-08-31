import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function uniqueSlug(base: string, excludeId: string) {
  const root = base || 'industry';
  let slug = root;
  let n = 2;
  while (await prisma.industry.findFirst({ where: { slug, NOT: { id: excludeId } } })) {
    slug = `${root}-${n++}`;
  }
  return slug;
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const industry = await prisma.industry.findUnique({ where: { id: params.id } });
  if (!industry) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(industry);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const b = await req.json();
  const existing = await prisma.industry.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const slug = b.slug ? await uniqueSlug(slugify(String(b.slug)), params.id) : existing.slug;
  const industry = await prisma.industry.update({
    where: { id: params.id },
    data: {
      slug,
      ...(b.name !== undefined && { name: b.name }),
      ...(b.sub !== undefined && { sub: b.sub }),
      ...(b.icon !== undefined && { icon: b.icon }),
      ...(b.desc !== undefined && { desc: b.desc }),
      ...(Array.isArray(b.useCases) && { useCases: b.useCases }),
      ...(Array.isArray(b.content) && { content: b.content }),
    },
  });
  return NextResponse.json(industry);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.industry.delete({ where: { id: params.id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
