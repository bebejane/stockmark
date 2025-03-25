import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { PortfolioDocument } from '@/graphql';
import Header from '@components/common/Header';
import Content from '@components/content/Content';
import classNames from '@node_modules/classnames';

export type PageProps = {
	children: React.ReactNode;
	params: LocaleParams['params'];
};

export default async function Home({ params }: PageProps) {
	const { locale } = await params;
	const { portfolioHeadline, allCompanies, draftUrl } = await apiQuery<
		PortfolioQuery,
		PortfolioQueryVariables
	>(PortfolioDocument, {
		variables: { locale },
	});

	return (
		<>
			<article className={s.page}>
				<Header content={portfolioHeadline.headline} />
				<section className={s.companies}>
					<ul className='grid'>
						{allCompanies.map((company, i) => (
							<li key={i}>
								<a href={company.url} target='_blank' rel='noreferrer'>
									{company.image && (
										<figure>
											<Image data={company.image?.responsiveImage} />
											<div className={classNames(s.text, 'small')}>
												<Content content={company.text} />
											</div>
										</figure>
									)}
									<h4>
										{company.name}
										<span>→</span>
									</h4>
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
