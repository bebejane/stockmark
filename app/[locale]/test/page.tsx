import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, VideoPlayer } from 'next-dato-utils/components';
import { TestDocument } from '@/graphql';
import Header from '@components/common/Header';
import Content from '@components/content/Content';
import classNames from '@node_modules/classnames';
import { setRequestLocale } from 'next-intl/server';
import HeadlineAndText from '@components/blocks/HeadlineAndText';

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
			<article className={s.page}>{test.title}</article>
			<DraftMode url={draftUrl} path={'/test'} />
		</>
	);
}
