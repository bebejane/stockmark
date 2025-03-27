import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { StartDocument } from '@/graphql';
import Hero from '@components/blocks/start/Hero';
import IntroText from '@components/blocks/start/IntroText';
import Facts from '@components/blocks/start/Facts';
import Portfolio from '@components/blocks/start/Portfolio';
import HeadlineAndText from '@components/blocks/HeadlineAndText';

export type PageProps = {
	children: React.ReactNode;
	params: LocaleParams['params'];
};

export default async function Home({ params }: PageProps) {
	const { locale } = await params;
	const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument, {
		variables: { locale },
	});

	return (
		<>
			<Hero video={start.video} headline={start.headline} summary={start.summary} />
			<HeadlineAndText
				intro={start.textIntro}
				text={start.text}
				link={{ label: 'Läs mer', href: '/om-oss' }}
			/>
			<Facts facts={start.facts} />
			<Portfolio portfolio={start.portfolio} />
			<DraftMode url={draftUrl} path='/' />
		</>
	);
}
