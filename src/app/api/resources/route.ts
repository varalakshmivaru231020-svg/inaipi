import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Newest first, and never cached: a resource published in the admin has to show
// on the site in a normal browser, without a hard refresh.
export async function GET() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(resources, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0' },
  });
}
