import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const b = await req.json();
  try {
    const item = await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        ...(b.name !== undefined && { name: b.name }),
        ...(b.role !== undefined && { role: b.role }),
        ...(b.quote !== undefined && { quote: b.quote }),
        ...(b.avatar !== undefined && { avatar: b.avatar }),
        ...(b.stat !== undefined && { stat: b.stat }),
        ...(b.statLabel !== undefined && { statLabel: b.statLabel }),
        ...(b.stars !== undefined && { stars: Number(b.stars) || 5 }),
      },
    });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.testimonial.delete({ where: { id: params.id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
