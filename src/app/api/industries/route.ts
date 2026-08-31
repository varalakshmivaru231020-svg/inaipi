import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Oldest first, so the six original cards keep their order and anything the
// admin adds joins the end of the grid.
export async function GET() {
  const industries = await prisma.industry.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(industries);
}
