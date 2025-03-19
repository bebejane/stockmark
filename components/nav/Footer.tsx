'use client';

import 'swiper/css';
import 'swiper/css/autoplay';
import s from './Footer.module.scss';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper } from 'swiper';
import { useRef, useState } from 'react';
import Content from '@components/content/Content';

type Props = {
	footer: FooterQuery['footer'];
};

export default function Footer({ footer }: Props) {
	const swiperRef = useRef<Swiper | null>(null);
	const [index, setIndex] = useState(0);

	return (
		<>
			<footer className={s.footer} data-lenis-snap={true}>
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
								<h2>
									<Content content={item.text} />
								</h2>
								<h3>{item.by}</h3>
							</div>
						</SwiperSlide>
					))}
				</SwiperReact>

				<div className={s.copyright}>
					<span className={s.text}>© Stockmark AB Kungsgatan 9, Stockholm</span>
					<span className={s.about}>
						<img src='/images/logo.svg' alt='Logo' />
					</span>
				</div>
			</footer>
		</>
	);
}
