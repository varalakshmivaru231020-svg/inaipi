import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await prisma.siteImage.findMany();
    const map = Object.fromEntries(rows.map(r => [r.key, r.value]));
    return NextResponse.json({
      architectureImage: map.architectureImage ?? '/arch1.png',
      agentDesktopImage: map.agentDesktopImage ?? '',
    });
  } catch {
    return NextResponse.json({ architectureImage: '/arch1.png', agentDesktopImage: '' });
  }
}
