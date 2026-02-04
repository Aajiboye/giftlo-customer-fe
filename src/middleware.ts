import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.has('giftlo_token');
  const url = req.nextUrl.clone();
  const currentPath = url.pathname;

  const loginPath = '/';
  const signupPath = '/signup';
  const dashboardPath = '/home';

  if (!token && currentPath.startsWith('/home')) {
    url.pathname = loginPath;
    return NextResponse.redirect(url);
  }

  // Authenticated user trying to access login or signup
  if (token && (currentPath === loginPath || currentPath === signupPath)) {
    url.pathname = dashboardPath;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/', '/signup']
};

