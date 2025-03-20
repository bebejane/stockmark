import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { StartDocument } from '@/graphql';
import Hero from '@components/blocks/start/Hero';
import IntroText from '@components/blocks/start/IntroText';
import Facts from '@components/blocks/start/Facts';
import Portfolio from '@components/blocks/start/Portfolio';

export default async function Home() {
	const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument);

	return (
		<>
			<Hero video={start.video} headline={start.headline} summary={start.summary} />
			<IntroText intro={start.textIntro} text={start.text} />
			<Facts facts={start.facts} />
			<Portfolio portfolio={start.portfolio} />
			<DraftMode url={draftUrl} path='/' />
		</>
	);
}
