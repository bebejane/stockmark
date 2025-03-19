import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import Link from 'next/link';
import { AboutDocument } from '@/graphql';
import AboutGallery from './AboutGallery';
import PageHeader from '@components/common/PageHeader';
import Content from '@components/content/Content';
import cn from '@node_modules/classnames';

export default async function Home() {
	const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument);

	return (
		<>
			<article className={s.page}>
				<PageHeader content={about.headline} />
				<section className={cn(s.about, "grid")}>
					<AboutGallery className={s.gallery} images={about.images as FileField[]} />
					<div className={s.text}>
						<Content content={about.text} />
						<Link href={'/manifest'}>Läs mer i vårat manifest</Link>
					</div>
				</section>
				<section className={s.principles}>
					<h2>{about.headlinePrinciples}</h2>
					<ul className="grid-2">
						{about.principles.map((principle, i) => (
							<li key={i} className="grid-6">
								<div className={cn("number", s.number)}>{i + 1}</div>
								<div className={s.content}>
									<h3>{principle.title}</h3>
									<Content content={principle.text} />
								</div>
							</li>
						))}
					</ul>
				</section>
				<section className={s.people}>
					<h2>{about.headlinePeople}</h2>
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
