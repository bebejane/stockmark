import { locales, defaultLocale, getPathname, AppPathnames } from '@/i18n/routing';
import { DatoCmsConfig, getUploadReferenceRoutes, getItemReferenceRoutes } from 'next-dato-utils/config';
import { MetadataRoute } from 'next';

export default {
	i18n: {
		locales,
		defaultLocale,
	},
	routes: {
		start: async (record, locale) => [getPathname({ locale, href: '/', forcePrefix: true })],
		about: async (record, locale) => [getPathname({ locale, href: '/om-oss', forcePrefix: true })],
		company: async (record, locale) => [
			getPathname({ locale, href: '/portfolj', forcePrefix: true }),
			getPathname({ locale, href: '/', forcePrefix: true }),
		],
		contact: async (record, locale) => [
			getPathname({ locale, href: '/kontakt', forcePrefix: true }),
			getPathname({ locale, href: '/om-oss', forcePrefix: true }),
			getPathname({ locale, href: '/', forcePrefix: true }),
		],
		footer: async (record, locale) => [getPathname({ locale, href: '/', forcePrefix: true })],
		manifest: async (record, locale) => [getPathname({ locale, href: '/manifest', forcePrefix: true })],
		portfolio_headline: async (record, locale) => [
			getPathname({ locale, href: '/portfolj', forcePrefix: true }),
			getPathname({ locale, href: '/', forcePrefix: true }),
		],
		you: async (record, locale) => [getPathname({ locale, href: '/om-dig', forcePrefix: true })],
		upload: async ({ id }) => getUploadReferenceRoutes(id),
	},
	sitemap: async () => {
		const canonicalPaths: AppPathnames[] = ['/', '/manifest', '/om-dig', '/om-oss', '/portfolj', '/kontakt'];

		const allPaths: string[] = locales
			.map((locale) => canonicalPaths.map((href) => getPathname({ locale, href })))
			.flat();

		return [
			...allPaths.map((route) => ({
				url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
				lastModified: new Date(),
				changeFrequency: 'weekly',
				priority: 1,
			})),
		] as MetadataRoute.Sitemap;
	},
	manifest: async () => {
		return {
			name: 'Stockmark',
			short_name: 'Stockmark',
			description: 'Stockmark website',
			start_url: '/',
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#f6f3ee',
			icons: [
				{
					src: '/favicon.ico',
					sizes: 'any',
					type: 'image/x-icon',
				},
			],
		} satisfies MetadataRoute.Manifest;
	},
	robots: async () => {
		return {
			rules: {
				userAgent: '*',
				allow: '/',
			},
		};
	},
} satisfies DatoCmsConfig;
