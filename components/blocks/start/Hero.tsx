'use client';

import s from './Hero.module.scss';
import cn from 'classnames';
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from '@node_modules/next/navigation';
import { sleep } from 'next-dato-utils/utils';
import Header, { extractHeaders } from '@components/common/Header';

export type HeroProps = {
	video: StartQuery['start']['video'];
	headline: StartQuery['start']['headline'];
	summary: StartQuery['start']['summary'];
};

const defaultBounds = {
	top: 0,
	left: 0,
	width: 0,
	height: 0,
	bottom: 0,
	right: 0,
	x: 0,
	y: 0,
};

export default function Hero({ video, headline, summary }: HeroProps) {
	const [thumbBounds, setThumbBounds] = React.useState<DOMRect | any>(defaultBounds);
	const pathname = usePathname();
	const ref = useRef<HTMLDivElement | null>(null);
	const thumbnailUrl = video.video.thumbnailUrl;
	const thumbnailRef = useRef<HTMLImageElement | null>(null);
	const { innerHeight, innerWidth } = useWindowSize();
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

	const top = useTransform(scrollYProgress, [0, 1], [0, thumbBounds.top]);
	const left = useTransform(scrollYProgress, [0, 1], [0, thumbBounds.left]);
	const width = useTransform(scrollYProgress, [0, 1], [innerWidth, thumbBounds.width]);
	const height = useTransform(scrollYProgress, [0, 1], [innerHeight, thumbBounds.height]);
	const opacity = useTransform(scrollYProgress, [0, 0.1], ['1', '0']);

	async function updateBounds() {
		const bounds = thumbnailRef.current?.getBoundingClientRect();
		setThumbBounds(bounds ?? null);
	}

	useEffect(() => {
		updateBounds();
	}, [innerHeight, innerWidth, pathname]);

	useLayoutEffect(() => {
		updateBounds();
	}, []);

	const headers = extractHeaders(summary);

	return (
		<section className={s.hero} ref={ref} data-lenis-snap={true}>
			<div className={s.header}>
				<motion.video
					suppressHydrationWarning={true}
					initial={false}
					className={s.video}
					style={{ top, left, width, height }}
					src={video.video?.mp4high}
					autoPlay={true}
					muted={true}
					loop={true}
					playsInline={true}
					disablePictureInPicture={true}
					poster={`${thumbnailUrl}?time=0`}
				/>
				<Header content={headline} margins={true} style={{ opacity }} />
			</div>
			<div className={s.text} data-lenis-snap={true}>
				{headers.map((row, i) => (
					<div key={i} className={s.row}>
						<h1 key={i}>
							{row.text.split(' ').map((col, j) => (
								<React.Fragment key={j}>
									{col === '###' ? (
										<div className={s.thumb} ref={thumbnailRef} />
									) : (
										<span key={j}>{col}</span>
									)}
								</React.Fragment>
							))}
						</h1>
					</div>
				))}
			</div>
		</section>
	);
}
