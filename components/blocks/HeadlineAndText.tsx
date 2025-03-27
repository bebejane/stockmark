'use client';

import s from './HeadlineAndText.module.scss';
import cn from 'classnames';
import React, { useRef } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import Content from '@components/content/Content';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export type HeroProps = {
	intro: any;
	text: any;
	link?: {
		label: string;
		href: string;
	};
};

export default function HeadlineAndText({ text, intro, link }: HeroProps) {
	const locale = useLocale();
	const ref = useRef<HTMLDivElement | null>(null);
	const paragraphs = useRef<HTMLDivElement[] | null>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });

	useMotionValueEvent(scrollYProgress, 'change', (ratio) => {
		paragraphs.current = paragraphs.current
			? paragraphs.current
			: Array.from(document.querySelectorAll(`.${s.text} > p`));

		console.log(paragraphs);
		paragraphs.current.forEach((p, i) => {
			const isActive = ratio > i / paragraphs.current.length;
			p.style.transitionDelay = `${0.2 * i}s`;
			p.classList.toggle(s.active, isActive);
		});
	});

	return (
		<section
			className={cn(s.container, 'grid')}
			ref={ref}
			data-lenis-snap={true}
			data-invert-section={false}
		>
			<div className={s.intro}>
				<Content content={intro} />
			</div>
			<div className={s.text}>
				<Content content={text} />
				{link && (
					<p>
						<Link
							locale={locale}
							//@ts-ignore
							href={link.href}
						>
							{link.label}
						</Link>
					</p>
				)}
			</div>
		</section>
	);
}
