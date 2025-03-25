import '@/styles/index.scss';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';

export type RootLayoutProps = {
	children: React.ReactNode;
	params: LocaleParams['params'];
};

export type BodyProps = {
	children: React.ReactNode;
	locale?: string;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
	const { locale = routing.defaultLocale } = await params;

	if (!routing.locales.includes(locale as any)) {
		return notFound();
	}
	setRequestLocale(locale);

	return (
		<html>
			<body lang={locale}>
				<Navbar />
				<main>
					<Body locale={locale}>{children}</Body>
				</main>
			</body>
		</html>
	);
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}
