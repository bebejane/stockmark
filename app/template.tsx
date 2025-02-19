'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Template({ children }) {
	const ref = useRef(null);

	useEffect(() => {
		const lenis = new Lenis();
		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
		return () => {
			lenis.destroy();
		};
	}, []);

	return <motion.div ref={ref}>{children}</motion.div>;
}
