import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, mkdirSync } from 'fs';
import { join, extname } from 'path';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file') as File | null;

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const ext  = extname(file.name) || '.jpg';
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const dir  = join(process.cwd(), 'public', 'uploads');

  mkdirSync(dir, { recursive: true });
  const bytes = await file.arrayBuffer();
  writeFileSync(join(dir, name), Buffer.from(bytes));

  return NextResponse.json({ url: `/uploads/${name}` });
}
