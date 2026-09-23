import { NextResponse } from 'next/server';
import { getCustomerStrip, DEFAULT_STRIP_SUBTITLE } from '@/lib/customerLogos';

export const dynamic = 'force-dynamic';

/** Public feed for the homepage customer strip: the line, the highlight and the logos. */
export async function GET() {
  try {
    const { logos, subtitle, highlight } = await getCustomerStrip();
    return NextResponse.json({ logos, subtitle, highlight });
  } catch {
    // DB unavailable — the strip renders its empty state rather than breaking,
    // and claims nothing we cannot read back.
    return NextResponse.json({ logos: [], subtitle: DEFAULT_STRIP_SUBTITLE, highlight: '' });
  }
}
