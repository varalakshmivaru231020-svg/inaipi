import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const FILE = join(process.cwd(), 'data', 'blogs.json');
const read = () => JSON.parse(readFileSync(FILE, 'utf-8'));
const write = (data: unknown) => writeFileSync(FILE, JSON.stringify(data, null, 2));

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const blog = read().find((b: { id: string }) => b.id === params.id);
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const blogs = read();
  const idx = blogs.findIndex((b: { id: string }) => b.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  blogs[idx] = { ...blogs[idx], ...body };
  write(blogs);
  return NextResponse.json(blogs[idx]);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const blogs = read().filter((b: { id: string }) => b.id !== params.id);
  write(blogs);
  return NextResponse.json({ ok: true });
}
