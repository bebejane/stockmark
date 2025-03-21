'use client';

import s from './Header.module.scss';
import cn from 'classnames';
import { render, renderNodeRule } from 'datocms-structured-text-to-html-string';
import { isHeading, isInlineBlock } from 'datocms-structured-text-utils';
import RevealHeader from '@components/common/RevealHeader';
import { motion, MotionStyle } from 'framer-motion';

export type HeaderProps = {
	content: any;
	video?: FileField;
	margins?: boolean;
	style?: MotionStyle;
};

export default function Header({ content, margins, style }: HeaderProps) {
	const headers = extractHeaders(content);

	return (
		<motion.header className={cn(s.header, margins && s.margins)} style={style}>
			{headers.map(({ text, className }, i) => (
				<RevealHeader key={i} size={1} className={className} delay={0.2 * i}>
					{text}
				</RevealHeader>
			))}
		</motion.header>
	);
}

export function extractHeaders(content: any): { text: string; className: string }[] {
	const headers = [];
	render(content, {
		customNodeRules: [
			renderNodeRule(isHeading, ({ adapter: { renderNode }, node, children, key }) => {
				headers.push({ text: children.join(''), className: node.style });
				return renderNode(`h${node.level + 1}`, { key, className: 'right' }, children);
			}),
			renderNodeRule(isInlineBlock, ({ adapter: { renderNode }, node, children, key }) => {
				// Replace with video thumbnail
				return '###';
			}),
		],
	});
	return headers;
}
