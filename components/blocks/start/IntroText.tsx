'use client';

import s from './IntroText.module.scss';
import cn from 'classnames';
import { VideoPlayer } from 'next-dato-utils/components';
import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';
import Content from '@components/content/Content';
import { Link } from '@/i18n/routing';

export type HeroProps = {
	intro: StartQuery['start']['textIntro'];
	text: StartQuery['start']['text'];
};

export default function IntroText({ text, intro }: HeroProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const { innerHeight, innerWidth } = useWindowSize();
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

	React.useEffect(() => {
		// hook into the onChange, store the current value as state.
		//scrollYProgress.onChange((v) => console.log(v));
	}, [scrollYProgress]); //make sur

	return (
		<section
			className={cn(s.introText, 'grid')}
			ref={ref}
			data-lenis-snap={true}
			data-invert-section={false}
		>
			<div className={s.intro}>
				<Content content={intro} />
			</div>
			<div className={s.text}>
				<Content content={text} />
				<Link href={'/manifest'}>Läs mer</Link>
			</div>
		</section>
	);
}
