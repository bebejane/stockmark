import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { ManifestDocument } from '@/graphql';

export default async function Home() {
	const { manifest, draftUrl } = await apiQuery<ManifestQuery, ManifestQueryVariables>(
		ManifestDocument
	);

	return (
		<>
			<article>Manifest</article>
			<DraftMode url={draftUrl} path={'/manifest'} />
		</>
	);
}
