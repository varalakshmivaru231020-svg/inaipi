import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const FILE = join(process.cwd(), 'data', 'blogs.json');
const read = () => JSON.parse(readFileSync(FILE, 'utf-8'));
const write = (data: unknown) => writeFileSync(FILE, JSON.stringify(data, null, 2));

export async function GET() {
  return NextResponse.json(read());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const blogs = read();
  const newBlog = {
    ...body,
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    comments: 0,
  };
  blogs.unshift(newBlog);
  write(blogs);
  return NextResponse.json(newBlog, { status: 201 });
}
