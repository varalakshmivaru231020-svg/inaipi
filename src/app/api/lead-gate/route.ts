import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Whether a visitor has to leave their details before a document is handed
 * over, per section. The detail pages are client components, so the gate reads
 * this rather than being told by the server.
 *
 * Gating is the default: an unset key, and a database that cannot be reached,
 * both mean "ask". Only an explicit `false` from the admin turns it off, so a
 * failure here can never quietly start giving files away.
 */
const GATE_KEYS = ['lead_gate_blog', 'lead_gate_resource', 'lead_gate_industry'];

export async function GET() {
  const s = await getSettings(GATE_KEYS);
  const on = (k: string) => s[k] !== 'false';
  return NextResponse.json({
    'Blog post': on('lead_gate_blog'),
    'Buyer Resource': on('lead_gate_resource'),
    Industry: on('lead_gate_industry'),
  });
}
