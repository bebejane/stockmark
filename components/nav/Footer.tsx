'use client';

import 'swiper/css';
import 'swiper/css/autoplay';
import s from './Footer.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper } from 'swiper';
import { use, useEffect, useRef, useState } from 'react';
import { useInViewRef } from 'rooks';
import Content from '@components/content/Content';
import Link from 'next/link';

type Props = {
	footer: FooterQuery['footer'];
};

export default function Footer({ footer }: Props) {
	const swiperRef = useRef<Swiper | null>(null);
	const [index, setIndex] = useState(0);
	const [ref, inView] = useInViewRef({ threshold: 0.2 });

	useEffect(() => {
		document.body.classList.toggle('invert', inView);
	}, [inView]);

	return (
		<>
			<footer
				id='footer'
				className={cn(s.footer, inView && s.invert)}
				data-lenis-snap={true}
				ref={ref}
			>
				<SwiperReact
					id={`testimonials`}
					className={s.swiper}
					wrapperClass={s.slideWrap}
					loop={true}
					modules={[Autoplay]}
					autoplay={{ delay: 4000, pauseOnMouseEnter: false }}
					slidesPerView={1}
					initialSlide={index}
					onSlideChange={({ realIndex }) => setIndex(realIndex)}
					onSwiper={(swiper) => (swiperRef.current = swiper)}
				>
					{footer.quotes.map((item, idx) => (
						<SwiperSlide
							key={idx}
							onClick={() => swiperRef.current?.slideNext()}
							className={s.slide}
						>
							<div>
								<h3>
									<Content content={item.text} />
								</h3>
								<h4>{item.by}</h4>
							</div>
						</SwiperSlide>
					))}
				</SwiperReact>

				<div className={s.copyright}>
					<span className={cn(s.text, 'small')}>© Stockmark AB Kungsgatan 9, Stockholm</span>
					<span className={s.about}>
						<Link href='/'>
							<img src='/images/symbol.svg' alt='Logo' />
						</Link>
					</span>
				</div>
			</footer>
		</>
	);
}
