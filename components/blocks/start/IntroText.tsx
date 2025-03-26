'use client';

import s from './IntroText.module.scss';
import cn from 'classnames';
import { VideoPlayer } from 'next-dato-utils/components';
import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Content from '@components/content/Content';
import { Link } from '@/i18n/routing';

export type HeroProps = {
	intro: StartQuery['start']['textIntro'];
	text: StartQuery['start']['text'];
};

export default function IntroText({ text, intro }: HeroProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const paragraphs = useRef<HTMLDivElement[] | null>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });

	useMotionValueEvent(scrollYProgress, 'change', (ratio) => {
		paragraphs.current = paragraphs.current
			? paragraphs.current
			: Array.from(document.querySelectorAll(`.${s.text} > p`));

		paragraphs.current.forEach((p, i) => {
			const isActive = ratio - 0.15 > i / paragraphs.current.length;
			p.classList.toggle(s.active, isActive);
		});
	});

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
				<p>
					<Link href={'/manifest'}>Läs mer</Link>
				</p>
			</div>
		</section>
	);
}
