'use client';

import React, { useRef, useEffect } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function Counter({
	value: _value,
	direction = 'up',
	unit = '%',
	className,
}: {
	value: string;
	direction?: 'up' | 'down';
	className?: string;
	unit?: string;
}) {
	const isFloat = _value.includes('.') || _value.includes(',');
	const value = isFloat ? parseFloat(_value.replace(',', '.')) : parseInt(_value);
	const ref = useRef<HTMLHeadingElement>(null);
	const motionValue = useMotionValue(direction === 'down' ? value : 0);
	const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
	const isInView = useInView(ref, { once: true });

	useEffect(() => {
		if (isInView) {
			motionValue.set(direction === 'down' ? 0 : value);
		}
	}, [motionValue, isInView]);

	useEffect(
		() =>
			springValue.on('change', (latest: number) => {
				if (!ref.current) return;
				const value = isFloat
					? (Math.round(latest * 10) / 10).toFixed(1).replace('.', ',')
					: Math.ceil(latest).toFixed(0);
				ref.current.textContent = `${value}`;
			}),
		[springValue]
	);

	return (
		<>
			<span className={className} ref={ref} />
			<span>{unit}</span>
		</>
	);
}
