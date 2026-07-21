import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const list = await prisma.testimonial.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  const item = await prisma.testimonial.create({
    data: {
      name: b.name ?? '',
      role: b.role ?? '',
      quote: b.quote ?? '',
      avatar: b.avatar ?? '',
      stat: b.stat ?? '',
      statLabel: b.statLabel ?? '',
      stars: Number(b.stars) || 5,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
