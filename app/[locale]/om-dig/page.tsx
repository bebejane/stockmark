import s from './page.module.scss';
import cn from 'classnames';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { YouDocument } from '@/graphql';
import Header from '@components/common/Header';
import Content from '@components/content/Content';
import classNames from '@node_modules/classnames';
import { setRequestLocale } from 'next-intl/server';
import { motion } from 'framer-motion';
import RevealInvest from './RevealInvest';

export type PageProps = {
	children: React.ReactNode;
	params: LocaleParams['params'];
};

export default async function You({ params }: PageProps) {
	const { locale } = await params;
	setRequestLocale(locale);

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
					<div className={cn('number')}>
						<div className={s.wrap}>
							<RevealInvest delay={0}>95% BRANCH</RevealInvest>
						</div>
					</div>
					<div className={cn('number')}>
						<div className={s.wrap}>
							<RevealInvest delay={0.2}>5% TEAM</RevealInvest>
						</div>
					</div>
				</section>
			</article>
			<DraftMode url={draftUrl} path={'/om-dig'} />
		</>
	);
}
