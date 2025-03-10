'use client';

import s from './Hero.module.scss';
import cn from 'classnames';
import { VideoPlayer } from 'next-dato-utils/components';
import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';

export type HeroProps = {
	video: FileField;
};

const rows = [
	['Kaffe.', 'Prata.', 'Mycket.'],
	['Ofta.', 'Länge.', 'Tänka.'],
	['Full gas.', 'Tillsammans.', 'Repetera.'],
];

export default function Hero({ video }: HeroProps) {
	const [thumbBounds, setThumbBounds] = React.useState<DOMRect | any>({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		bottom: 0,
		right: 0,
		x: 0,
		y: 0,
	});
	const ref = useRef<HTMLDivElement | null>(null);
	const thumbnailUrl = video.video?.thumbnailUrl;
	const thumbnailRef = useRef<HTMLImageElement | null>(null);
	const { innerHeight, innerWidth } = useWindowSize();
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

	const top = useTransform(scrollYProgress, [0, 1], [0, thumbBounds.top]);
	const left = useTransform(scrollYProgress, [0, 1], [0, thumbBounds.left]);
	const width = useTransform(scrollYProgress, [0, 1], [innerWidth, thumbBounds.width]);
	const height = useTransform(scrollYProgress, [0, 1], [innerHeight, thumbBounds.height]);

	useEffect(() => {
		const bounds = thumbnailRef.current?.getBoundingClientRect();
		setThumbBounds(bounds ?? null);
	}, [innerHeight, innerWidth]);

	React.useEffect(() => {
		// hook into the onChange, store the current value as state.
		//scrollYProgress.onChange((v) => console.log(v));
	}, [scrollYProgress]); //make sur

	return (
		<section className={s.hero} ref={ref}>
			<motion.video
				suppressHydrationWarning={true}
				initial={false}
				className={s.video}
				style={{ top, left, width, height }}
				//@ts-ignore
				src={video.video?.mp4high}
				autoPlay={true}
				muted={true}
				loop={true}
				playsInline={true}
				disablePictureInPicture={true}
				poster={`${thumbnailUrl}?time=0`}
			/>
			<div className={s.text}>
				{rows.map((cols, i) => (
					<div key={i} className={s.row}>
						<h2 key={i}>
							{cols.map((col, j) => (
								<React.Fragment key={j}>
									<span key={j}>{col}</span>
									{i === 1 && j === 1 && <img ref={thumbnailRef} src={thumbnailUrl} />}
								</React.Fragment>
							))}
						</h2>
					</div>
				))}
			</div>
		</section>
	);
}
