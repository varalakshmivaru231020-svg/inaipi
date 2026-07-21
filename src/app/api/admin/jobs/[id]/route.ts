import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function uniqueSlug(base: string, excludeId: string) {
  const root = base || 'role';
  let slug = root;
  let n = 2;
  while (await prisma.job.findFirst({ where: { slug, NOT: { id: excludeId } } })) {
    slug = `${root}-${n++}`;
  }
  return slug;
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(job);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const b = await req.json();
  const existing = await prisma.job.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const slug = b.slug ? await uniqueSlug(slugify(String(b.slug)), params.id) : existing.slug;
  const job = await prisma.job.update({
    where: { id: params.id },
    data: {
      slug,
      ...(b.title !== undefined && { title: b.title }),
      ...(b.type !== undefined && { type: b.type }),
      ...(b.location !== undefined && { location: b.location }),
      ...(b.salary !== undefined && { salary: b.salary }),
      ...(b.desc !== undefined && { desc: b.desc }),
      ...(Array.isArray(b.responsibilities) && { responsibilities: b.responsibilities }),
      ...(Array.isArray(b.requirements) && { requirements: b.requirements }),
      ...(Array.isArray(b.offers) && { offers: b.offers }),
    },
  });
  return NextResponse.json(job);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.job.delete({ where: { id: params.id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
