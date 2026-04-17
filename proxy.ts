import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supportedLocales, defaultLocale, getLocale } from './lib/i18n';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Avoid running middleware on static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/public') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the path already starts with a supported locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Check for NEXT_LOCALE cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  if (pathnameHasLocale) {
    // If the path has a locale, ensure the cookie stays in sync
    const pathLocale = pathname.split('/')[1];
    if (cookieLocale !== pathLocale && supportedLocales.includes(pathLocale)) {
      const response = NextResponse.next();
      response.cookies.set('NEXT_LOCALE', pathLocale, { path: '/', maxAge: 31536000 });
      return response;
    }
    return NextResponse.next();
  }

  // Determine locale: Cookie > Accept-Language > Default
  const rawLocale = cookieLocale || 
                   request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || 
                   defaultLocale;
  
  const locale = getLocale(rawLocale);
  
  return NextResponse.redirect(new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
