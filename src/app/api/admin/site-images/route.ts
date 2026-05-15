import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const FILE = join(process.cwd(), 'data', 'site-images.json');

function read() {
  try { return JSON.parse(readFileSync(FILE, 'utf-8')); }
  catch { return { architectureImage: '/arch1.png', agentDesktopImage: '' }; }
}

export async function GET() {
  return NextResponse.json(read());
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const current = read();
  const updated = { ...current, ...body };
  writeFileSync(FILE, JSON.stringify(updated, null, 2));
  return NextResponse.json(updated);
}
