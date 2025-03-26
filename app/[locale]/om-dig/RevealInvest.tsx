'use client';

import { motion } from 'framer-motion';

export default function Counter({ children, delay = 0 }: { children: string; delay: number }) {
	return (
		<motion.span
			initial='hidden'
			whileInView='visible'
			exit={'exit'}
			viewport={{ once: true }}
			style={{ display: 'inline-block' }}
			variants={{
				hidden: { y: '100%' },
				exit: { x: '-100%', y: '0%' },
				visible: {
					y: '0%',
					transition: {
						delay,
						type: 'spring',
						stiffness: 50,
						mass: 0.5,
					},
				},
			}}
		>
			{children}
		</motion.span>
	);
}
