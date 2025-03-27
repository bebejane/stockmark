'use client';

import s from './Hero.module.scss';
import React, { useRef, useEffect, useState } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { sleep } from 'next-dato-utils/utils';
import Header, { extractHeaders } from '@components/common/Header';

export type HeroProps = {
	video: StartQuery['start']['video'];
	headline: StartQuery['start']['headline'];
	summary: StartQuery['start']['summary'];
};

export default function Hero({ video, headline, summary }: HeroProps) {
	const [thumbBounds, setThumbBounds] = React.useState<DOMRect | any>(null);
	const pathname = usePathname();
	const ref = useRef<HTMLDivElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const thumbnailUrl = video.video.thumbnailUrl;
	const thumbnailRef = useRef<HTMLImageElement | null>(null);
	const { innerHeight, innerWidth } = useWindowSize();
	const [videoHeight, setVideoHeight] = useState(0);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end end'],
		layoutEffect: false,
	});

	async function updateBounds() {
		setVideoHeight(videoRef.current?.clientHeight);
		await sleep(100);
		const bounds = thumbnailRef.current?.getBoundingClientRect();
		if (!bounds) return;
		setThumbBounds({ ...bounds.toJSON(), top: bounds.top + window.scrollY });
	}

	useEffect(() => {
		updateBounds();
	}, [pathname, innerHeight, innerWidth]);

	const top = useTransform(scrollYProgress, [0, 1], [0, thumbBounds?.top]);
	const left = useTransform(scrollYProgress, [0, 1], [0, thumbBounds?.left]);
	const width = useTransform(scrollYProgress, [0, 1], [innerWidth, thumbBounds?.width]);
	const height = useTransform(scrollYProgress, [0, 1], [videoHeight, thumbBounds?.height]);
	const opacity = useTransform(scrollYProgress, [0, 0.1], ['1', '0']);
	const headers = extractHeaders(summary);

	return (
		<section className={s.hero} ref={ref} data-lenis-snap={true}>
			<div className={s.header} data-invert-section={true}>
				<motion.video
					ref={videoRef}
					layout={true}
					initial={true}
					className={s.video}
					style={thumbBounds?.top > 0 ? { top, left, width, height } : undefined}
					src={video.video?.mp4high}
					autoPlay={true}
					muted={true}
					loop={true}
					playsInline={true}
					disablePictureInPicture={true}
					poster={`${thumbnailUrl}?time=0`}
				/>
				<Header content={headline} margins={true} style={{ opacity }} midSpace={true} />
			</div>
			<div className={s.text} data-lenis-snap={true} data-invert-section={false}>
				{headers.map((row, i) => (
					<div key={i} className={s.row}>
						<h1 key={i}>
							{row.text.split(' ').map((col, j) => (
								<React.Fragment key={j}>
									{col === '###' ? (
										<span>
											<div className={s.thumb} ref={thumbnailRef} />
										</span>
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
