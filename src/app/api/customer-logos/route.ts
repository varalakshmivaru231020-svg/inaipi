import { NextResponse } from 'next/server';
import { getCustomerLogos } from '@/lib/customerLogos';

export const dynamic = 'force-dynamic';

/** Public feed for the homepage customer strip. Always returns a list. */
export async function GET() {
  try {
    return NextResponse.json({ logos: await getCustomerLogos() });
  } catch {
    // DB unavailable — the strip renders its empty state rather than breaking.
    return NextResponse.json({ logos: [] });
  }
}
