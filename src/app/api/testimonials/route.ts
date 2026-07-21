import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const list = await prisma.testimonial.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(list);
}
