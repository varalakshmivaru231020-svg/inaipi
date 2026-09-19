import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Hidden is the only thing that governs this now; the old published flag
    // is no longer written or read.
    const list = await prisma.testimonial.findMany({ where: { hidden: false }, orderBy: { createdAt: 'asc' } });
    return NextResponse.json(list);
  } catch {
    // DB unavailable — the section renders its existing empty state.
    return NextResponse.json([]);
  }
}
