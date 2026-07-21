import type { Metadata } from 'next';
import { prisma } from './prisma';
import { SEO_PAGES, SEO_DEFAULTS, mergeSeo, type SeoEntry } from './seoPages';

/** Saved overrides from the DB, keyed by page — only non-empty fields kept so blanks fall back to defaults. */
async function readSaved(): Promise<Record<string, Partial<SeoEntry>>> {
  try {
    const rows = await prisma.seo.findMany();
    const out: Record<string, Partial<SeoEntry>> = {};
    for (const r of rows) {
      const e: Partial<SeoEntry> = { noindex: r.noindex };
      if (r.title) e.title = r.title;
      if (r.description) e.description = r.description;
      if (r.keywords) e.keywords = r.keywords;
      if (r.canonical) e.canonical = r.canonical;
      if (r.ogTitle) e.ogTitle = r.ogTitle;
      if (r.ogDescription) e.ogDescription = r.ogDescription;
      if (r.ogImage) e.ogImage = r.ogImage;
      out[r.page] = e;
    }
    return out;
  } catch {
    // DB unavailable (e.g. during build without a connection) — fall back to defaults.
    return {};
  }
}

/** Full, defaults-merged SEO map for every known page. */
export async function readSeo(): Promise<Record<string, SeoEntry>> {
  const saved = await readSaved();
  const out: Record<string, SeoEntry> = {};
  for (const p of SEO_PAGES) out[p.key] = mergeSeo(p.key, saved[p.key]);
  return out;
}

/** Merged SEO for a single page key. */
export async function getSeo(key: string): Promise<SeoEntry> {
  const saved = await readSaved();
  return mergeSeo(key, saved[key]);
}

/** Persist the full SEO map (one row per page). */
export async function saveSeo(map: Record<string, Partial<SeoEntry>>) {
  for (const p of SEO_PAGES) {
    const e = map[p.key] ?? {};
    const data = {
      title: e.title ?? '',
      description: e.description ?? '',
      keywords: e.keywords ?? '',
      canonical: e.canonical ?? '',
      ogTitle: e.ogTitle ?? '',
      ogDescription: e.ogDescription ?? '',
      ogImage: e.ogImage ?? '',
      noindex: !!e.noindex,
    };
    await prisma.seo.upsert({ where: { page: p.key }, update: data, create: { page: p.key, ...data } });
  }
}

/** Build a Next.js Metadata object from a page's SEO settings. */
export async function buildMetadata(key: string): Promise<Metadata> {
  const s = await getSeo(key);
  const ogTitle = s.ogTitle || s.title;
  const ogDesc = s.ogDescription || s.description;
  const images = s.ogImage ? [{ url: s.ogImage }] : undefined;

  return {
    title: s.title,
    description: s.description,
    keywords: s.keywords ? s.keywords.split(',').map(k => k.trim()).filter(Boolean) : undefined,
    alternates: s.canonical ? { canonical: s.canonical } : undefined,
    robots: s.noindex ? { index: false, follow: false } : undefined,
    openGraph: { title: ogTitle, description: ogDesc, images },
    twitter: { card: 'summary_large_image', title: ogTitle, description: ogDesc, images: s.ogImage ? [s.ogImage] : undefined },
  };
}

export { SEO_PAGES, SEO_DEFAULTS };
