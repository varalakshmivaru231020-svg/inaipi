import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'inaipi@admin2024';
const SESSION_TOKEN   = process.env.ADMIN_SECRET   ?? 'inaipi-secret-session-2024';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', SESSION_TOKEN, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', '', { maxAge: 0, path: '/' });
  return res;
}
