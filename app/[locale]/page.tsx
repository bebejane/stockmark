import { apiQuery } from 'next-dato-utils/api';
import { locales } from '@/i18n/routing';
import { DraftMode } from 'next-dato-utils/components';
import { StartDocument } from '@/graphql';
import Hero from '@/components/blocks/start/Hero';
import Facts from '@/components/blocks/start/Facts';
import Portfolio from '@/components/blocks/start/Portfolio';
import HeadlineAndText from '@/components/blocks/HeadlineAndText';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export type PageProps = {
	children: React.ReactNode;
	params: LocaleParams['params'];
};

export default async function Home({ params }: PageProps) {
	const { locale } = await params;

	if (!locales.includes(locale)) return notFound();

	const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument, {
		variables: { locale },
	});
	const t = await getTranslations('Start');

	return (
		<>
			<Hero video={start.video} headline={start.headline} summary={start.summary} />
			<HeadlineAndText
				intro={start.textIntro}
				text={start.text}
				margins={true}
				link={{ label: t('readmore'), href: '/om-oss' }}
			/>
			<Facts facts={start.facts} />
			<Portfolio portfolio={start.portfolio} />
			<DraftMode url={draftUrl} path='/' />
		</>
	);
}
