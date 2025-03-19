'use client';

import s from './Blank.module.scss';
import cn from 'classnames';
import { VideoPlayer } from 'next-dato-utils/components';
import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Blank() {
	//return null;
	const ref = useRef<HTMLDivElement | null>(null);
	const { innerHeight, innerWidth } = useWindowSize();
	const [scrollY, setScrollY] = React.useState(0);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

	React.useEffect(() => {
		// hook into the onChange, store the current value as state.
		scrollYProgress.onChange((v) => setScrollY(v));
	}, [scrollYProgress]); //make sur
	//const left = useTransform(scrollYProgress, [0, 1], [0, thumbBounds.left]);
	//const width = useTransform(scrollYProgress, [0, 1], [innerWidth, thumbBounds.width]);
	//const height = useTransform(scrollYProgress, [0, 1], [innerHeight, thumbBounds.height]);

	return (
		<section className={s.blank} ref={ref} data-lenis-snap={true}>
			<h1>{scrollY}</h1>
		</section>
	);
}
