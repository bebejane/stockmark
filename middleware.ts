import { routing } from '@/i18n/routing'
import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  localePrefix: routing.localePrefix,
  defaultLocale: routing.defaultLocale,
  localeDetection: false,
});

export default async function middleware(request: NextRequest) {

  const intlRes = intlMiddleware(request);
  return intlRes
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/',
    '/((?!api|favicon|_next|_vercel|.*\\..*).*)',
  ]
};
