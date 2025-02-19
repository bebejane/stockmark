import { Menu } from '@/lib/menu';
import s from './Footer.module.scss';
import Link from 'next/link';
import { apiQuery } from 'next-dato-utils/api';

export default async function Footer({ menu }: { menu: Menu }) {
	return (
		<>
			<footer className={s.footer}>
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
