import s from './page.module.scss';
import Link from 'next/link';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, VideoPlayer } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import Hero from '@components/blocks/start/Hero';
import { StartDocument } from '@/graphql';

const streamingUrl = 'https://stream.mux.com/YazXWqnFSARMweZRHcrTuPa4QP00AXykt/high.mp4';

export default async function Home() {
	const { start } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument);
	return <Hero video={start?.video as FileField} />;
}
