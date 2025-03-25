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
      sv: '/om-oss',
      en: '/about',
    },
    '/om-dig': {
      sv: '/om-dig',
      en: '/you',
    },
    '/manifest': {
      sv: '/om-oss',
      en: '/about',
    },
    '/portfolj': {
      sv: '/portfolj',
      en: '/portfolio',
    }
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

