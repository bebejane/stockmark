'use client';

import { motion } from 'framer-motion';

export type RevealHeaderProps = {
	children: string;
	size: 1 | 2 | 3;
	className?: string;
	delay?: number;
};

export default function RevealHeader({ children, size = 1, className, delay }: RevealHeaderProps) {
	const Header = `h${size}` as keyof JSX.IntrinsicElements;

	return (
		<Header className={className} style={{ overflow: 'hidden', padding: 0 }}>
			<motion.span
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				variants={{
					hidden: { y: '100%' },
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
				style={{ display: 'inline-block' }}
			>
				{children}
			</motion.span>
		</Header>
	);
}
