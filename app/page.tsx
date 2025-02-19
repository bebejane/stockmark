import s from './page.module.scss';
import Link from 'next/link';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, VideoPlayer } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import Hero from '@components/blocks/start/Hero';
import Header from '@components/blocks/start/Header';
import Blank from '../components/blocks/start/Blank';
import { StartDocument } from '@/graphql';

export default async function Home() {
	const { start } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument);
	return (
		<>
			<Hero video={start?.video as FileField} />
			<Blank />
			<Header />
			<Blank />
		</>
	);
}
