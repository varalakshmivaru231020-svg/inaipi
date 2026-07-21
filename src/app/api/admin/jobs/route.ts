import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function uniqueSlug(base: string, excludeId?: string) {
  const root = base || 'role';
  let slug = root;
  let n = 2;
  while (await prisma.job.findFirst({ where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) } })) {
    slug = `${root}-${n++}`;
  }
  return slug;
}

export async function GET() {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  const slug = await uniqueSlug(slugify(String(b.slug || b.title || 'role')));
  const job = await prisma.job.create({
    data: {
      slug,
      title: b.title ?? '',
      type: b.type ?? 'Full time',
      location: b.location ?? '',
      salary: b.salary ?? '',
      desc: b.desc ?? '',
      responsibilities: Array.isArray(b.responsibilities) ? b.responsibilities : [],
      requirements: Array.isArray(b.requirements) ? b.requirements : [],
      offers: Array.isArray(b.offers) ? b.offers : [],
    },
  });
  return NextResponse.json(job, { status: 201 });
}
