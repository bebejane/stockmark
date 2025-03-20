'use client';

import s from './Header.module.scss';
import cn from 'classnames';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { render, renderNodeRule } from 'datocms-structured-text-to-html-string';
import { isHeading, isInlineBlock } from 'datocms-structured-text-utils';
import RevealHeader from '@components/common/RevealHeader';

export type HeaderProps = {
	content: any;
	video?: FileField;
	margins?: boolean;
};

export default function Header({ content, margins }: HeaderProps) {
	const headers = extractHeaders(content);

	return (
		<header className={cn(s.header, margins && s.margins)}>
			{headers.map(({ text, className }, i) => (
				<RevealHeader key={i} size={1} className={className} delay={0.2 * i}>
					{text}
				</RevealHeader>
			))}
		</header>
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
				//headers.push({ text: children, className: node.style });

				return '#';
			}),
		],
	});
	return headers;
}
