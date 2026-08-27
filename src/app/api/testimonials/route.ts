import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const list = await prisma.testimonial.findMany({ orderBy: { createdAt: 'asc' } });
    return NextResponse.json(list);
  } catch {
    // DB unavailable — the section renders its existing empty state.
    return NextResponse.json([]);
  }
}
