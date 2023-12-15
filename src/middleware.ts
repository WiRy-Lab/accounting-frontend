// import withAuth from 'next-auth/middleware';

export { default as middleware } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)',
    '/',
  ],
};
