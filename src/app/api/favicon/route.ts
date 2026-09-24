import { NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join, extname, normalize } from 'path';
import { getSetting } from '@/lib/settings';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * The browser tab icon.
 *
 * The admin can upload one, so the icon cannot be a file baked into the build
 * — this route serves whatever is set, falling back to the Inaipi mark that
 * ships with the site. /favicon.ico is rewritten here too, so the bare request
 * every browser makes on its own gets the same answer as the <link> tag.
 */

/* local, not exported: a route file may only export its handlers and config */
const FAVICON_KEY = 'site_favicon';

const DEFAULT_ICON = 'client-assets/images/brand/favicon.ico';

const TYPES: Record<string, string> = {
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
};

/**
 * Only ever read from the two folders the site's own images live in. The value
 * comes from the admin, so it is treated as untrusted input rather than a path.
 */
function safeRelPath(value: string): string | null {
  if (!value) return null;
  const rel = normalize(value.replace(/^\/+/, '')).replace(/\\/g, '/');
  if (rel.includes('..')) return null;
  if (!/^(uploads|client-assets)\//.test(rel)) return null;
  if (!TYPES[extname(rel).toLowerCase()]) return null;
  return rel;
}

async function readPublic(rel: string) {
  const file = join(process.cwd(), 'public', rel);
  const [body, info] = await Promise.all([readFile(file), stat(file)]);
  return { body, info };
}

export async function GET() {
  const stored = await getSetting(FAVICON_KEY, '').catch(() => '');
  const chosen = safeRelPath(stored);

  for (const rel of [chosen, DEFAULT_ICON].filter(Boolean) as string[]) {
    try {
      const { body, info } = await readPublic(rel);
      return new NextResponse(new Uint8Array(body), {
        headers: {
          'Content-Type': TYPES[extname(rel).toLowerCase()] || 'application/octet-stream',
          // revalidate every time: a new icon should show up on the next load,
          // and the body is a couple of kilobytes
          'Cache-Control': 'public, max-age=0, must-revalidate',
          ETag: `"${info.size}-${Math.round(info.mtimeMs)}"`,
        },
      });
    } catch {
      // fall through to the bundled default
    }
  }

  return new NextResponse(null, { status: 404 });
}
