'use client';

import { useTranslations } from 'next-intl';
import s from './ScrollButton.module.scss';
import cn from 'classnames';
import { useScrollInfo } from 'next-dato-utils/hooks';
import { useEffect, useState } from 'react';

export default function ScrollButton({ locale }: { locale: string }) {
	const t = useTranslations('Manifest');
	const { scrolledPosition, viewportHeight } = useScrollInfo();
	const [hidden, setHidden] = useState(false);

	function handleClick() {
		window.scrollTo({
			top: viewportHeight,
			behavior: 'smooth',
		});
	}

	useEffect(() => {
		setHidden(scrolledPosition > 0);
	}, [scrolledPosition]);

	return (
		<button className={cn(s.scroll, hidden && s.hide)} onClick={handleClick}>
			({t('scroll')})
		</button>
	);
}
