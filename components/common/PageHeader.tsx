'use client';

import s from './PageHeader.module.scss';
import cn from 'classnames';
import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';

export type PageHeaderProps = {
	content: any;
};

export default function PageHeader({ content }: PageHeaderProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const { innerHeight, innerWidth } = useWindowSize();

	return (
		<header className={s.header}>
			<h1>Vi är Stockmark.</h1>
			<h1 className={s.right}>Investerare med</h1>
			<h1>entreprenörsbakgrund.</h1>
		</header>
	);
}
