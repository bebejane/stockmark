import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { AboutDocument } from '@/graphql';

export default async function Home() {
	const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument);

	return (
		<>
			<article>Om oss</article>
			<DraftMode url={draftUrl} path={'/om-oss'} />
		</>
	);
}
