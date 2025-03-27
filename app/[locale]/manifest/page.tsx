import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, VideoPlayer } from 'next-dato-utils/components';
import { ManifestDocument } from '@/graphql';
import Header from '@components/common/Header';
import Content from '@components/content/Content';
import classNames from '@node_modules/classnames';
import { setRequestLocale } from 'next-intl/server';
import HeadlineAndText from '@components/blocks/HeadlineAndText';

export type PageProps = {
	children: React.ReactNode;
	params: LocaleParams['params'];
};

export default async function Manifest({ params }: PageProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const { manifest, draftUrl } = await apiQuery<ManifestQuery, ManifestQueryVariables>(
		ManifestDocument,
		{ variables: { locale } }
	);

	return (
		<>
			<article className={s.page}>
				<div className={s.header}>
					<Header content={manifest.headline} midSpace={true} />
					<VideoPlayer data={manifest.video} className={s.video} />
				</div>
				<HeadlineAndText intro={manifest.intro} text={manifest.text} />
			</article>
			<DraftMode url={draftUrl} path={'/manifest'} />
		</>
	);
}
