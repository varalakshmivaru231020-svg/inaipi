import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const file = join(process.cwd(), 'data', 'testimonials.json');
    const testimonials = JSON.parse(readFileSync(file, 'utf-8'));
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
