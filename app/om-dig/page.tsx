import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { YouDocument } from '@/graphql';

export default async function Home() {
	const { you, draftUrl } = await apiQuery<YouQuery, YouQueryVariables>(YouDocument);

	return (
		<>
			Om dig
			<DraftMode url={draftUrl} path={'/om-dig'} />
		</>
	);
}
