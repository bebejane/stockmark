'use client';

import s from './Portfolio.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper } from 'swiper';

import React, { useRef, useEffect, useState } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';
import Content from '@components/content/Content';
import Link from '@node_modules/next/link';
import { Image } from 'react-datocms';

export type HeroProps = {
	portfolio: StartQuery['start']['portfolio'];
};

export default function Portfolio({ portfolio }: HeroProps) {
	const projects = portfolio.concat(portfolio).concat(portfolio);
	const ref = useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'start end'] });
	const left = useTransform(scrollYProgress, [1, 0], ['-200vw', '0vw']);

	return (
		<section className={cn(s.portfolio)} ref={ref} data-lenis-snap={true}>
			<div className={s.header}>
				<h3>i vår portfölj</h3>
				<Link href={'/portfolj'}>Visa alla</Link>
			</div>
			<div className={s.gallery}>
				<motion.ul className={s.wrap} style={{ left }} initial={false}>
					{projects.map(({ id, image, name, text }, idx) => (
						<li key={idx}>
							{image && (
								<figure>
									<Image data={image?.responsiveImage} />
									<div className={cn(s.text, 'small')}>
										<Content content={text} />
									</div>
								</figure>
							)}
							<h3>{name}</h3>
						</li>
					))}
				</motion.ul>
			</div>
		</section>
	);
}
