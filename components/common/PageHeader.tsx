'use client';

import s from './PageHeader.module.scss';
import cn from 'classnames';
import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'rooks';
import { motion, useScroll, useTransform } from 'framer-motion';
import Content from '@/components/content/Content';

export type PageHeaderProps = {
	content: any;
	video?: FileField;
};

export default function PageHeader({ content, video }: PageHeaderProps) {
	return (
		<header className={s.header}>
			<Content content={content} />
		</header>
	);
}
