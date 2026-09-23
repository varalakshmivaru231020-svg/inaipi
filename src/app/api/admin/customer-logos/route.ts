import { NextRequest, NextResponse } from 'next/server';
import { getCustomerStrip, setCustomerStrip } from '@/lib/customerLogos';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { logos, subtitle, highlight } = await getCustomerStrip();
  return NextResponse.json({ logos, subtitle, highlight });
}

/** The Save Logos action: the strip's text and its logos in one write. */
export async function PUT(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    logos?: unknown;
    subtitle?: unknown;
    highlight?: unknown;
  };
  const { logos, subtitle, highlight } = await setCustomerStrip({
    logos: body?.logos ?? [],
    subtitle: body?.subtitle,
    highlight: body?.highlight,
  });
  return NextResponse.json({ logos, subtitle, highlight });
}
