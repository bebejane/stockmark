'use client';
import 'lenis/dist/lenis.css';
import Lenis from 'lenis';
//@ts-ignore
import Snap from 'lenis/snap';

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
		function setupSnaps() {
			const snap = new Snap(lenis, {});
			const sections = Array.from(
				document.querySelectorAll<HTMLDivElement>('[data-lenis-snap="true"]')
			);
			sections.forEach((section) => {
				snap.add(section.getBoundingClientRect().top);
			});
		}
		requestAnimationFrame(raf);
		//setupSnaps();

		return () => {
			lenis.destroy();
		};
	}, []);

	return <motion.div ref={ref}>{children}</motion.div>;
}
