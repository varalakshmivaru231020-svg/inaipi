import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_TOKEN = process.env.ADMIN_SECRET ?? 'inaipi-secret-session-2024';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  const isAdminApi  = pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth');

  if (isAdminPage || isAdminApi) {
    const session = request.cookies.get('admin_session')?.value;
    if (session !== SESSION_TOKEN) {
      if (isAdminPage) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
