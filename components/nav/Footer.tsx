import { Menu } from '@/lib/menu';
import s from './Footer.module.scss';
import Link from 'next/link';
import { apiQuery } from 'next-dato-utils/api';

type Props = {
	footer: FooterQuery['footer'];
};

export default async function Footer({ footer }: Props) {
	return (
		<>
			<footer className={s.footer} data-lenis-snap={true}>
				<nav>
					<h2>VI KOMMER. VI STANNAR. VI SKAPAR. TILLSAMMANS.</h2>
					<h3>Vem är du?</h3>
				</nav>
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
