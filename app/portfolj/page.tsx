import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { PortfolioDocument } from '@/graphql';

export default async function Home() {
	const { portfolioHeadline, allCompanies, draftUrl } = await apiQuery<
		PortfolioQuery,
		PortfolioQueryVariables
	>(PortfolioDocument);

	return (
		<>
			Portfolj
			<DraftMode url={draftUrl} path={'/portfolj'} />
		</>
	);
}
