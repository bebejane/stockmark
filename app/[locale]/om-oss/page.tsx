import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { Link, routing } from '@/i18n/routing';
import { AboutDocument } from '@/graphql';
import AboutGallery from './AboutGallery';
import Header from '@components/common/Header';
import Content from '@components/content/Content';
import cn from '@node_modules/classnames';
import Principles from './Principles';
import RevealHeader from '@components/common/RevealHeader';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export type PageProps = {
	children: React.ReactNode;
	params: LocaleParams['params'];
};

export default async function About({ params }: PageProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations('About');
	const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, {
		variables: { locale },
		tags: ['about'],
	});

	return (
		<>
			<article className={s.page}>
				<Header content={about.headline} />
				<section className={cn(s.about, 'grid')}>
					<AboutGallery images={about.images as FileField[]} />
					<div className={s.text}>
						<Content content={about.text} />
						<Link href={'/manifest'}>{t('readmore')} →</Link>
					</div>
				</section>
				<Principles about={about} />
				<section className={s.people}>
					<RevealHeader size={2}>{about.headlinePeople}</RevealHeader>
					<ul className='grid'>
						{about.people?.map((person, i) => (
							<li key={i}>
								<Image data={person.portrait.responsiveImage} />
								<h3>{person.name}</h3>
								<p>{person.text}</p>
							</li>
						))}
					</ul>
				</section>
			</article>
			<DraftMode url={draftUrl} path={'/om-oss'} />
		</>
	);
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}
