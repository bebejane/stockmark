import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { PortfolioDocument } from '@/graphql';
import PageHeader from '@components/common/PageHeader';

export default async function Home() {
	const { portfolioHeadline, allCompanies, draftUrl } = await apiQuery<
		PortfolioQuery,
		PortfolioQueryVariables
	>(PortfolioDocument);

	return (
		<>
			<article className={s.page}>
				<PageHeader content={portfolioHeadline.headline} />
				<section className={s.companies}>
					<ul>
						{allCompanies.map((company, i) => (
							<li key={i}>
								<a href={company.url} target='_blank' rel='noreferrer'>
									{company.image && (
										<figure>
											<Image data={company.image?.responsiveImage} />
										</figure>
									)}
									<h3>{company.name}</h3>
								</a>
							</li>
						))}
					</ul>
				</section>
			</article>
			<DraftMode url={draftUrl} path={'/portfolj'} />
		</>
	);
}
