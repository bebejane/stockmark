'use client';

import s from './Hero.module.scss';
import cn from 'classnames';
import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from '@node_modules/next/navigation';

export type HeroProps = {
	video: StartQuery['start']['video'];
};

const rows = [
	['Kaffe.', 'Prata.', 'Mycket.'],
	['Ofta.', 'Länge.', 'Tänka.'],
	['Full gas.', 'Tillsammans.'],
];
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

export default function Hero({ video }: HeroProps) {
	const [thumbBounds, setThumbBounds] = React.useState<DOMRect | any>(defaultBounds);
	const pathname = usePathname();
	const ref = useRef<HTMLDivElement | null>(null);
	const thumbnailUrl = video.video?.thumbnailUrl;
	const thumbnailRef = useRef<HTMLImageElement | null>(null);
	const { innerHeight, innerWidth } = useWindowSize();
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

	const top = useTransform(scrollYProgress, [0, 1], [0, thumbBounds.top]);
	const left = useTransform(scrollYProgress, [0, 1], [0, thumbBounds.left]);
	const width = useTransform(scrollYProgress, [0, 1], [innerWidth, thumbBounds.width]);
	const height = useTransform(scrollYProgress, [0, 1], [innerHeight, thumbBounds.height]);

	function updateBounds() {
		const bounds = thumbnailRef.current?.getBoundingClientRect();
		setThumbBounds(bounds ?? null);
	}
	useEffect(() => {
		updateBounds();
	}, [innerHeight, innerWidth, pathname]);

	React.useEffect(() => {
		// hook into the onChange, store the current value as state.
		//scrollYProgress.onChange((v) => console.log(v));
	}, [scrollYProgress]); //make sur

	return (
		<section className={s.hero} ref={ref} data-lenis-snap={true}>
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
			<div className={s.text} data-lenis-snap={true}>
				{rows.map((cols, i) => (
					<div key={i} className={s.row}>
						<h1 key={i}>
							{cols.map((col, j) => (
								<React.Fragment key={j}>
									<span key={j}>{col}</span>
									{i === 1 && j === 1 && (
										<img ref={thumbnailRef} src={thumbnailUrl} onLoad={updateBounds} />
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
