import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Which whole sections the admin has chosen to show.
 *
 * Both sections render on the client, so they ask for this rather than being
 * told by the server. Showing is the default: an unset key, and a database
 * that cannot be reached, both mean show, so a failure here leaves the site
 * looking as it always did rather than blanking a section.
 */
const KEYS = ['show_testimonials', 'show_trust_logos'];

export async function GET() {
  const s = await getSettings(KEYS);
  return NextResponse.json({
    testimonials: s.show_testimonials !== 'false',
    trustLogos: s.show_trust_logos !== 'false',
  });
}
