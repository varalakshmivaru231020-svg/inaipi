import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, mkdirSync } from 'fs';
import { join, extname, basename } from 'path';

/* Images for covers and the rich editor, plus the brochures and documents the
   content types offer for download. Anything else is refused rather than
   written to disk. */
const ALLOWED = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg', '.ico',
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.csv', '.txt', '.zip',
]);
const MAX_BYTES = 25 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file') as File | null;

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const ext = extname(file.name).toLowerCase() || '.jpg';
  if (!ALLOWED.has(ext)) {
    return NextResponse.json({ error: `Files of type ${ext} are not accepted` }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File is larger than 25 MB' }, { status: 413 });
  }

  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const dir = join(process.cwd(), 'public', 'uploads');

  mkdirSync(dir, { recursive: true });
  const bytes = await file.arrayBuffer();
  writeFileSync(join(dir, name), Buffer.from(bytes));

  // the original name is what a download should be called
  return NextResponse.json({ url: `/uploads/${name}`, name: basename(file.name), size: file.size });
}
