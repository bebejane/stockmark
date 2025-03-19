import '@styles/index.scss';
import s from './layout.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { AllContactsDocument, FooterDocument, GlobalDocument } from '@graphql';
import { Metadata } from 'next';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import Navbar from '../components/nav/Navbar';
import { buildMenu } from '../lib/menu';
import { Suspense } from 'react';
import Footer from '@/components/nav/Footer';

export type LayoutProps = {
	children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
	const menu = await buildMenu();
	const { allContacts } = await apiQuery<AllContactsQuery, AllContactsQueryVariables>(
		AllContactsDocument
	);
	const { footer } = await apiQuery<FooterQuery, FooterQueryVariables>(FooterDocument);

	return (
		<>
			<html lang='en'>
				<body id='root'>
					<Navbar menu={menu} allContacts={allContacts} />
					<main className={s.main}>{children}</main>
					<Footer footer={footer} />
				</body>
			</html>
		</>
	);
}

export async function generateMetadata() {
	const {
		site: { globalSeo, faviconMetaTags },
	} = await apiQuery<GlobalQuery, GlobalQueryVariables>(GlobalDocument, {
		variables: {},
		revalidate: 60 * 60,
	});

	return {
		metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
		title: {
			template: `${globalSeo?.siteName} — %s`,
			default: globalSeo?.siteName,
		},
		description: globalSeo?.fallbackSeo?.description,
		image: globalSeo?.fallbackSeo?.image?.url,
		icons: faviconMetaTags.map(({ attributes: { rel, sizes, type, href: url } }) => ({
			rel,
			url,
			sizes,
			type,
		})) as Icon[],
		openGraph: {
			title: globalSeo?.siteName,
			description: globalSeo?.fallbackSeo?.description,
			url: process.env.NEXT_PUBLIC_SITE_URL,
			siteName: globalSeo?.siteName,
			images: [
				{
					url: `${globalSeo?.fallbackSeo?.image?.url}?w=1200&h=630&fit=fill&q=80`,
					width: 800,
					height: 600,
					alt: globalSeo?.siteName,
				},
				{
					url: `${globalSeo?.fallbackSeo?.image?.url}?w=1600&h=800&fit=fill&q=80`,
					width: 1600,
					height: 800,
					alt: globalSeo?.siteName,
				},
				{
					url: `${globalSeo?.fallbackSeo?.image?.url}?w=790&h=627&fit=crop&q=80`,
					width: 790,
					height: 627,
					alt: globalSeo?.siteName,
				},
			],
			locale: 'en_US',
			type: 'website',
		},
	} as Metadata;
}
