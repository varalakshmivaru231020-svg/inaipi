import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(jobs);
}
