import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** List enquiry submissions (newest first). */
export async function GET() {
  try {
    const items = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 500 });
    const unread = items.filter(i => !i.read).length;
    return NextResponse.json({ items, unread });
  } catch {
    return NextResponse.json({ items: [], unread: 0 });
  }
}

/** Mark an enquiry read/unread. Body: { id, read }. */
export async function PATCH(req: NextRequest) {
  const { id, read } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await prisma.enquiry.update({ where: { id: String(id) }, data: { read: !!read } });
  return NextResponse.json({ ok: true });
}

/** Delete an enquiry. Body: { id }. */
export async function DELETE(req: NextRequest) {
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await prisma.enquiry.delete({ where: { id: String(id) } });
  return NextResponse.json({ ok: true });
}
