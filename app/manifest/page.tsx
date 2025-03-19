import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, VideoPlayer } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { ManifestDocument } from '@/graphql';
import PageHeader from '@components/common/PageHeader';
import Content from '@components/content/Content';
import classNames from '@node_modules/classnames';

export default async function Home() {
	const { manifest, draftUrl } = await apiQuery<ManifestQuery, ManifestQueryVariables>(
		ManifestDocument
	);

	return (
		<>
			<article className={s.page}>
				<div className={s.header}>
					<PageHeader content={manifest.headline} />
					<VideoPlayer data={manifest.video} className={s.video} />
				</div>
				<section className={classNames(s.content, "grid-2")}>
					<div className={s.intro}>
						<Content content={manifest.intro} />
					</div>
					<div className={s.text}>
						<Content content={manifest.text} />
					</div>
				</section>
			</article>
			<DraftMode url={draftUrl} path={'/manifest'} />
		</>
	);
}
