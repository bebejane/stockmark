import s from './page.module.scss';
import cn from 'classnames';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { YouDocument } from '@/graphql';
import Header from '@components/common/Header';
import Content from '@components/content/Content';
import classNames from '@node_modules/classnames';
import Counter from '@app/[locale]/om-dig/Counter';

export type PageProps = {
	children: React.ReactNode;
	params: LocaleParams['params'];
};

export default async function Home({ params }: PageProps) {
	const { locale } = await params;
	const { you, draftUrl } = await apiQuery<YouQuery, YouQueryVariables>(YouDocument, {
		variables: { locale },
	});

	return (
		<>
			<article className={s.page}>
				<Header content={you.headline} />
				<section className={s.text}>
					<Content content={you.text} />
				</section>
				<section className={classNames(s.invest, 'grid-2')}>
					<h3>{you.inevestHeadline}</h3>
					<div className={cn(s.counter, 'number')}>
						<Counter value={'95'} unit={'%'} direction={'up'} /> BRANCH
					</div>
					<div className={cn(s.counter, 'number')}>
						<Counter value={'5'} unit={'%'} direction={'up'} className={cn(s.counter)} /> TEAM
					</div>
				</section>
			</article>
			<DraftMode url={draftUrl} path={'/om-dig'} />
		</>
	);
}
