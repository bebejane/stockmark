'use client';

import { motion } from 'framer-motion';
import { exit } from 'process';

export type RevealHeaderProps = {
	children: string;
	size: 1 | 2 | 3;
	className?: string;
	delay?: number;
};

export default function RevealHeader({ children, size = 1, className, delay }: RevealHeaderProps) {
	const Header = `h${size}` as React.ElementType;

	return (
		<Header className={className} style={{ overflow: 'hidden', padding: 0 }}>
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
		</Header>
	);
}
