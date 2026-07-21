import { NextRequest, NextResponse } from 'next/server';
import { readSeo, saveSeo } from '@/lib/seo';
import { SEO_PAGES } from '@/lib/seoPages';

export const dynamic = 'force-dynamic';

// Returns every page with its merged (defaults + saved) SEO values.
export async function GET() {
  const seo = await readSeo();
  const pages = SEO_PAGES.map(p => ({ ...p, seo: seo[p.key] }));
  return NextResponse.json({ pages });
}

// Body: { [pageKey]: SeoEntry } — persists one row per page.
export async function PUT(req: NextRequest) {
  const body = await req.json();
  await saveSeo(body ?? {});
  return NextResponse.json({ ok: true });
}
