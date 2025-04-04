import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import Link from 'next/link';
import { AboutDocument } from '@/graphql';
import AboutGallery from './AboutGallery';
import Header from '@components/common/Header';
import Content from '@components/content/Content';
import cn from '@node_modules/classnames';
import Principles from '@app/om-oss/Principles';
import RevealHeader from '@components/common/RevealHeader';

export default async function About() {
	const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument);

	return (
		<>
			<article className={s.page}>
				<Header content={about.headline} />
				<section className={cn(s.about, 'grid')}>
					<AboutGallery images={about.images as FileField[]} />
					<div className={s.text}>
						<Content content={about.text} />
						<Link href={'/manifest'}>Läs mer i vårt manifest →</Link>
					</div>
				</section>
				<Principles about={about} />
				<section className={s.people}>
					<RevealHeader size={2}>{about.headlinePeople}</RevealHeader>
					<ul>
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
