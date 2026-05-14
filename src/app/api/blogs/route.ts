import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const file = join(process.cwd(), 'data', 'blogs.json');
    const blogs = JSON.parse(readFileSync(file, 'utf-8'));
    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
