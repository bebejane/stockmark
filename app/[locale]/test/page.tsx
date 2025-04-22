import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
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
				<Image data={test.image.responsiveImage} />
			</article>
			<DraftMode url={draftUrl} path={'/test'} />
		</>
	);
}
