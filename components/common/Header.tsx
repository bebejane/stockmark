'use client';

import s from './Header.module.scss';
import cn from 'classnames';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { render, renderNodeRule } from 'datocms-structured-text-to-html-string';
import { isHeading } from 'datocms-structured-text-utils';

export type HeaderProps = {
	content: any;
	video?: FileField;
	margins?: boolean;
};

export default function Header({ content, margins }: HeaderProps) {
	const headers = [];
	render(content, {
		customNodeRules: [
			renderNodeRule(isHeading, ({ adapter: { renderNode }, node, children, key }) => {
				headers.push({ text: children, className: node.style });
				return renderNode(`h${node.level + 1}`, { key, className: 'right' }, children);
			}),
		],
	});

	return (
		<header className={cn(s.header, margins && s.margins)}>
			{headers.map(({ text, className }, i) => (
				<h1 key={i} className={className}>
					<motion.span
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
						variants={{
							hidden: { y: '100%' },
							visible: {
								y: '0%',
								transition: {
									delay: 0.2 * i,
									type: 'spring',
									stiffness: 50,
									mass: 0.5,
								},
							},
						}}
					>
						{text}
					</motion.span>
				</h1>
			))}
		</header>
	);
}
