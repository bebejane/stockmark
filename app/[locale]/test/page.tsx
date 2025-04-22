import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, VideoPlayer } from 'next-dato-utils/components';
import { TestDocument } from '@/graphql';
import { setRequestLocale } from 'next-intl/server';
import { Image } from 'react-datocms';

export type PageProps = {
	children: React.ReactNode;
	params: LocaleParams['params'];
};

export default async function Test({ params }: PageProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const { test, draftUrl } = await apiQuery<TestQuery, TestQueryVariables>(TestDocument, {
		variables: { locale },
	});

	return (
		<>
			<article className={s.page}>
				<h1>{test.title}</h1>
				{test.image?.responsiveImage ? (
					<Image data={test.image.responsiveImage} />
				) : test.image.video ? (
					<VideoPlayer data={test.image} />
				) : null}
			</article>
			<DraftMode url={draftUrl} path={'/test'} />
		</>
	);
}
