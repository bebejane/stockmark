'use client';

import s from './PageHeader.module.scss';
import cn from 'classnames';
import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';
import Content from '@/components/content/Content';
import { render, renderNodeRule } from 'datocms-structured-text-to-html-string';
import { isHeading } from 'datocms-structured-text-utils';

export type PageHeaderProps = {
	content: any;
	video?: FileField;
};

export default function PageHeader({ content, video }: PageHeaderProps) {
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
		<header className={s.header}>
			{headers.map(({ text, className }, i) => (
				<h1 key={i} className={className}>
					<span style={{ animationDelay: `${i * 0.4}s` }}>{text}</span>
				</h1>
			))}
		</header>
	);
}
