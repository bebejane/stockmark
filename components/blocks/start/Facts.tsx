'use client';

import s from './Facts.module.scss';
import cn from 'classnames';
import React, { useRef, useEffect } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export type HeroProps = {
	facts: StartQuery['start']['facts'];
};

export default function Facts({ facts }: HeroProps) {
	const ref = useRef<HTMLDivElement | null>(null);

	return (
		<section className={cn(s.facts)} ref={ref} data-lenis-snap={true} data-invert-section={false}>
			<ul className='grid'>
				{facts.map((fact, i) => (
					<li key={i}>
						<Counter value={fact.number} className='number' />
						<span>{fact.label}</span>
					</li>
				))}
			</ul>
		</section>
	);
}

function Counter({
	value: _value,
	direction = 'up',
	className,
}: {
	value: string;
	direction?: 'up' | 'down';
	className?: string;
}) {
	const isFloat = _value.includes('.') || _value.includes(',');
	const value = isFloat ? parseFloat(_value.replace(',', '.')) : parseInt(_value);
	const ref = useRef<HTMLHeadingElement>(null);
	const motionValue = useMotionValue(direction === 'down' ? value : 0);
	const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
	const isInView = useInView(ref, { once: true, margin: '0px' });

	useEffect(() => {
		if (isInView) {
			motionValue.set(direction === 'down' ? 0 : value);
		}
	}, [isInView, motionValue]);

	useEffect(
		() =>
			springValue.on('change', (latest: number) => {
				if (!ref.current) return;
				const val = isFloat
					? (Math.round(latest * 10) / 10).toFixed(1).replace('.', ',')
					: Math.ceil(latest).toFixed(0);

				ref.current.textContent = val;
			}),
		[springValue]
	);

	return <h3 className={className} ref={ref} />;
}
