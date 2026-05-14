import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const FILE = join(process.cwd(), 'data', 'testimonials.json');
const read = () => JSON.parse(readFileSync(FILE, 'utf-8'));
const write = (data: unknown) => writeFileSync(FILE, JSON.stringify(data, null, 2));

export async function GET() {
  return NextResponse.json(read());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const list = read();
  const item = { ...body, id: Date.now().toString(), stars: Number(body.stars) || 5 };
  list.push(item);
  write(list);
  return NextResponse.json(item, { status: 201 });
}
