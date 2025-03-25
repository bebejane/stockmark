'use client';

import s from './Navbar.module.scss';
import cn from 'classnames';
import { useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/routing';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '@/lib/menu';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import ContactPopup from '@components/nav/ContactPopup';
import { locales } from '@/i18n/routing';

export type NavbarProps = {
	menu: Menu;
	allContacts: AllContactsQuery['allContacts'];
};

export const invertTopRoutes = ['/', '/manifest'];

export default function Navbar({ menu, allContacts }: NavbarProps) {
	const locale = useLocale();
	const ref = useRef<HTMLDivElement | null>(null);
	const prevScroll = useRef<number | null>(null);
	const pathname = usePathname();
	const [invert, setInvert] = useState(true);
	const [showContact, setShowContact] = useState(false);
	const { scrollY } = useScroll();
	const [hide, setHide] = useState(false);

	const isCurrentPathname = (slug: string) => {
		return slug === pathname || `/${locale}${slug}` === pathname;
	};

	const canInvertTop = invertTopRoutes.some(
		(route) => route === pathname || locales.some((locale) => `/${locale}${route}` === pathname)
	);

	const nav = menu.filter(({ id }) => id !== 'contact');
	const contact = menu.find(({ id }) => id === 'contact');

	useMotionValueEvent(scrollY, 'change', (y) => {
		const documentHeight = document.documentElement.scrollHeight;
		const viewportHeight = window.innerHeight;
		const margin = 50;
		const scrolledDown = y >= documentHeight - viewportHeight - margin;
		const scrolledUp = y < prevScroll.current;
		const scrolledAtTop = canInvertTop && y < viewportHeight && y > margin && !scrolledUp;
		setHide(!scrolledUp);
		setInvert(scrolledDown || scrolledAtTop || y <= margin);
		prevScroll.current = y;
	});

	useEffect(() => {
		setInvert(canInvertTop);
	}, [pathname]);

	return (
		<>
			<nav className={cn(s.navbar, invert && s.inverted)} ref={ref}>
				<figure className={s.logo}>
					<Link href={'/'}>
						<img src='/images/logo.svg' alt='Logo' />
					</Link>
				</figure>

				<ul className={s.menu}>
					{nav.map(({ id, title, href, slug, sub }, i) => (
						<li
							key={id}
							className={cn(
								s.item,
								sub && s.dropdown,
								isCurrentPathname(slug) && s.active,
								hide && s.hide
							)}
							style={{ transitionDelay: `${(0.1 / nav.length) * (nav.length - i)}s` }}
						>
							{sub ? (
								<span>{title}</span>
							) : (
								//@ts-ignore
								<Link href={slug ?? href}>{title}</Link>
							)}
						</li>
					))}
				</ul>
				<ul className={s.contact}>
					<li
						className={cn(isCurrentPathname(contact.slug) && s.active, showContact && s.hidden)}
						onClick={() => setShowContact(true)}
					>
						<span>{contact.title}</span>
					</li>
					<ContactPopup
						allContacts={allContacts}
						show={showContact}
						onClose={() => setShowContact(false)}
					/>
					<li>
						<Link href={`/`} locale={locale === 'en' ? 'sv' : 'en'}>
							<span>{locale === 'en' ? 'SV' : 'EN'}</span>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
