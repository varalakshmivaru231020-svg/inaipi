import { NextResponse } from 'next/server';
import { readSeo } from '@/lib/seo';

export const dynamic = 'force-dynamic';

// Public read of all merged SEO values (defaults + saved overrides).
export async function GET() {
  return NextResponse.json(await readSeo());
}
