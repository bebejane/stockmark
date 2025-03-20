'use client';

import s from './Facts.module.scss';
import cn from 'classnames';
import { VideoPlayer } from 'next-dato-utils/components';
import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';
import Content from '@components/content/Content';
import Link from '@node_modules/next/link';

export type HeroProps = {
	facts: StartQuery['start']['facts'];
};

export default function Facts({ facts }: HeroProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const { innerHeight, innerWidth } = useWindowSize();
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

	React.useEffect(() => {
		// hook into the onChange, store the current value as state.
		//scrollYProgress.onChange((v) => console.log(v));
	}, [scrollYProgress]); //make sur

	return (
		<section className={cn(s.facts)} ref={ref} data-lenis-snap={true}>
			<ul className='grid'>
				{facts.map((fact, index) => (
					<li key={index}>
						<h3 className='number'>{fact.number}</h3>
						<span>{fact.label}</span>
					</li>
				))}
			</ul>
		</section>
	);
}
