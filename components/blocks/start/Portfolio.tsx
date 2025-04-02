'use client';

import s from './Portfolio.module.scss';
import cn from 'classnames';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Content from '@components/content/Content';
import Link from '@node_modules/next/link';
import { Image } from 'react-datocms';
import useIsDesktop from '@lib/useIsDesktop';
import { useTranslations } from 'next-intl';

export type HeroProps = {
	portfolio: StartQuery['start']['portfolio'];
};

export default function Portfolio({ portfolio }: HeroProps) {
	const t = useTranslations('Start');

	const projects = portfolio
		.concat(portfolio)
		.concat(portfolio)
		.concat(portfolio)
		.concat(portfolio);

	const isDesktop = useIsDesktop();
	const ref = useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
	const left = useTransform(scrollYProgress, [1, 0], ['-100vw', isDesktop ? '-50vw' : '-500vw']);

	return (
		<section
			className={cn(s.portfolio)}
			ref={ref}
			data-lenis-snap={true}
			data-invert-section={false}
		>
			<div className={s.header}>
				<h3>{t('in-our-portfolio')}</h3>
				<Link href={'/portfolj'}>{t('showall')} →</Link>
			</div>
			<div className={s.gallery}>
				<motion.ul style={{ left }} initial={false}>
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
							<h4>{name}</h4>
						</li>
					))}
				</motion.ul>
			</div>
		</section>
	);
}
