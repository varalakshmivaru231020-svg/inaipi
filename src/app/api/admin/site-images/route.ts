import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function currentMap() {
  const rows = await prisma.siteImage.findMany();
  const map = Object.fromEntries(rows.map(r => [r.key, r.value]));
  return {
    architectureImage: map.architectureImage ?? '/arch1.png',
    agentDesktopImage: map.agentDesktopImage ?? '',
  };
}

export async function GET() {
  return NextResponse.json(await currentMap());
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  for (const [key, value] of Object.entries(body)) {
    await prisma.siteImage.upsert({
      where: { key },
      update: { value: String(value ?? '') },
      create: { key, value: String(value ?? '') },
    });
  }
  return NextResponse.json(await currentMap());
}
