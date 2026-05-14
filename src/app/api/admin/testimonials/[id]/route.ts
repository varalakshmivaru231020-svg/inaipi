import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const FILE = join(process.cwd(), 'data', 'testimonials.json');
const read = () => JSON.parse(readFileSync(FILE, 'utf-8'));
const write = (data: unknown) => writeFileSync(FILE, JSON.stringify(data, null, 2));

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const list = read();
  const idx = list.findIndex((t: { id: string }) => t.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  list[idx] = { ...list[idx], ...body, stars: Number(body.stars) || 5 };
  write(list);
  return NextResponse.json(list[idx]);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const list = read().filter((t: { id: string }) => t.id !== params.id);
  write(list);
  return NextResponse.json({ ok: true });
}
