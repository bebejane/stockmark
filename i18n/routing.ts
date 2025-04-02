import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const locales = ['sv', 'en'];
export const defaultLocale = 'sv';
export const localePrefix = 'as-needed';
export const routing = defineRouting({
  locales,
  localePrefix,
  defaultLocale,
  pathnames: {
    '/': '/',
    '/om-oss': {
      en: '/about',
    },
    '/om-dig': {
      en: '/you',
    },
    '/manifest': '/manifest',
    '/portfolj': {
      en: '/portfolio',
    },
    '/kontakt': {
      en: '/contact',
    }
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

