'use client';

import s from './Header.module.scss';
import cn from 'classnames';
import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';

export type HeaderProps = {
	//video: FileField;
};

const rows = ['Egentligen vill vi inte', 'prata om oss alls.', 'Vi vill prata om dig.'];

export default function Header({}: HeaderProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const { innerHeight, innerWidth } = useWindowSize();
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

	const headerstyle = {
		y: useTransform(scrollYProgress, [0, 0.5, 1], [50, 25, 0]),
	};

	React.useEffect(() => {
		console.log(scrollYProgress);
		// hook into the onChange, store the current value as state.
		scrollYProgress.onChange((v) => console.log(v));
	}, [scrollYProgress]); //make sur

	return (
		<section className={s.header} ref={ref}>
			<div className={s.wrap}>
				{rows.map((row, i) => (
					<div key={i} className={s.row}>
						<motion.h2
							transition={{ delay: 0.5 }}
							initial={{ y: 60 }}
							whileInView={{ y: 0 }}
							viewport={{ once: false }}
						>
							{row}
						</motion.h2>
					</div>
				))}
			</div>
		</section>
	);
}
