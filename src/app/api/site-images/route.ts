import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const raw = readFileSync(join(process.cwd(), 'data', 'site-images.json'), 'utf-8');
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ architectureImage: '/arch1.png', agentDesktopImage: '' });
  }
}
