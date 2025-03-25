import { routing } from '@/i18n/routing'
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: routing.locales,
  localePrefix: routing.localePrefix,
  defaultLocale: routing.defaultLocale,
  localeDetection: false,
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|favicon|_next|_vercel|.*\\..*).*)',
  ]
};
