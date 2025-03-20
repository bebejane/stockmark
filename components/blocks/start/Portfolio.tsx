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
	const ref = useRef<HTMLDivElement | null>(null);
	const swiperRef = useRef<Swiper | null>(null);
	const [index, setIndex] = useState(0);
	const { innerHeight, innerWidth } = useWindowSize();
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

	React.useEffect(() => {
		// hook into the onChange, store the current value as state.
		//scrollYProgress.onChange((v) => console.log(v));
	}, [scrollYProgress]); //make sur

	return (
		<section className={cn(s.portfolio)} ref={ref} data-lenis-snap={true}>
			<SwiperReact
				id={`portfolio`}
				className={s.swiper}
				wrapperClass={s.slideWrap}
				loop={true}
				modules={[Autoplay]}
				autoplay={{ delay: 4000, pauseOnMouseEnter: false }}
				slidesPerView={4}
				initialSlide={0}
				onSlideChange={({ realIndex }) => setIndex(realIndex)}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
			>
				{portfolio.map(({ id, image, name, text }, idx) => (
					<SwiperSlide key={id} onClick={() => swiperRef.current?.slideNext()} className={s.slide}>
						{image && (
							<figure>
								<Image data={image?.responsiveImage} />
								<div className={cn(s.text, 'small')}>
									<Content content={text} />
								</div>
							</figure>
						)}
						<h3>
							{name}
							<span>→</span>
						</h3>
					</SwiperSlide>
				))}
			</SwiperReact>
		</section>
	);
}
