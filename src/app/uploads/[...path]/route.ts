import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, statSync } from 'fs';
import { join, basename, extname } from 'path';

export const dynamic = 'force-dynamic';

/**
 * Serves the files the admin uploads.
 *
 * Uploads are written into `public/uploads` at runtime, but the static file
 * handler builds its list of public files when the server starts, so anything
 * uploaded since then is a 404 until somebody restarts the app. That made a
 * cover image chosen in the admin unusable without a developer. Reading the
 * file from disk here means it works the moment it is uploaded; once the app
 * restarts the static handler picks the same file up and this is unused.
 */

const TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

export async function GET(_req: NextRequest, { params }: { params: { path: string[] } }) {
  // basename() keeps a crafted path from reaching outside the uploads folder
  const name = basename((params.path ?? []).join('/'));
  const type = TYPES[extname(name).toLowerCase()];
  if (!name || !type) return new NextResponse('Not found', { status: 404 });

  try {
    const file = join(process.cwd(), 'public', 'uploads', name);
    if (!statSync(file).isFile()) return new NextResponse('Not found', { status: 404 });
    const body = new Uint8Array(readFileSync(file));
    return new NextResponse(body, {
      headers: {
        'Content-Type': type,
        'Content-Length': String(body.byteLength),
        // upload names carry a timestamp and a random suffix, so they never change
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
