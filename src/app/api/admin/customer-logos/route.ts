import { NextRequest, NextResponse } from 'next/server';
import { getCustomerLogos, setCustomerLogos } from '@/lib/customerLogos';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ logos: await getCustomerLogos() });
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const logos = await setCustomerLogos((body as { logos?: unknown })?.logos ?? []);
  return NextResponse.json({ logos });
}
