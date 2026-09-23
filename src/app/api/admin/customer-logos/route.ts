import { NextRequest, NextResponse } from 'next/server';
import { getCustomerStrip, setCustomerStrip } from '@/lib/customerLogos';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { logos, subtitle } = await getCustomerStrip();
  return NextResponse.json({ logos, subtitle });
}

/** The Save Logos action: the strip's line and its logos in one write. */
export async function PUT(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { logos?: unknown; subtitle?: unknown };
  const { logos, subtitle } = await setCustomerStrip({
    logos: body?.logos ?? [],
    subtitle: body?.subtitle,
  });
  return NextResponse.json({ logos, subtitle });
}
