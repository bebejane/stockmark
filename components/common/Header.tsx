'use client';

import s from './Header.module.scss';
import cn from 'classnames';
import RevealHeader from '@components/common/RevealHeader';
import { motion, MotionStyle } from 'framer-motion';
import { extractHeaders } from '@lib/utils';

export type HeaderProps = {
	content: any;
	video?: FileField;
	margins?: boolean;
	midSpace?: boolean;
	style?: MotionStyle;
};

export default function Header({ content, margins, style, midSpace }: HeaderProps) {
	const headers = extractHeaders(content);

	return (
		<motion.header
			className={cn(s.header, margins && s.margins, midSpace && s.midSpace)}
			style={style}
		>
			{headers.map(({ text, className }, i) => (
				<RevealHeader key={i} size={1} className={className} delay={0.2 * i}>
					{text}
				</RevealHeader>
			))}
		</motion.header>
	);
}
