'use client';

import s from './ScrollButton.module.scss';
import cn from 'classnames';
import { useScrollInfo } from 'next-dato-utils/hooks';
import { useEffect, useState } from 'react';

export default function ScrollButton() {
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
			(SCROLLA)
		</button>
	);
}
