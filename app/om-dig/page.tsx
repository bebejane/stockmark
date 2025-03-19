import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { YouDocument } from '@/graphql';
import PageHeader from '@components/common/PageHeader';
import Content from '@components/content/Content';

export default async function Home() {
	const { you, draftUrl } = await apiQuery<YouQuery, YouQueryVariables>(YouDocument);

	return (
		<>
			<article className={s.page}>
				<PageHeader content={you.headline} />
				<section>
					<Content content={you.text} />
				</section>
				<section>
					<h2>{you.inevestHeadline}</h2>
					<Content content={you.investText} />
				</section>
			</article>
			<DraftMode url={draftUrl} path={'/om-dig'} />
		</>
	);
}
