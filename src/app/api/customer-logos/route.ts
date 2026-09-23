import { NextResponse } from 'next/server';
import { getCustomerStrip, DEFAULT_STRIP_SUBTITLE } from '@/lib/customerLogos';

export const dynamic = 'force-dynamic';

/** Public feed for the homepage customer strip: the line and the logos. */
export async function GET() {
  try {
    const { logos, subtitle } = await getCustomerStrip();
    return NextResponse.json({ logos, subtitle });
  } catch {
    // DB unavailable — the strip renders its empty state rather than breaking.
    return NextResponse.json({ logos: [], subtitle: DEFAULT_STRIP_SUBTITLE });
  }
}
