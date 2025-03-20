import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { YouDocument } from '@/graphql';
import Header from '@components/common/Header';
import Content from '@components/content/Content';
import classNames from '@node_modules/classnames';

export default async function Home() {
	const { you, draftUrl } = await apiQuery<YouQuery, YouQueryVariables>(YouDocument);

	return (
		<>
			<article className={s.page}>
				<Header content={you.headline} />
				<section className={s.text}>
					<Content content={you.text} />
				</section>
				<section className={classNames(s.invest, 'grid-2')}>
					<h3>{you.inevestHeadline}</h3>
					<Content content={you.investText} />
				</section>
			</article>
			<DraftMode url={draftUrl} path={'/om-dig'} />
		</>
	);
}
