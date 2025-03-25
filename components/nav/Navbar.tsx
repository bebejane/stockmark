'use client';

import s from './Navbar.module.scss';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '@/lib/menu';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import ContactPopup from '@components/nav/ContactPopup';

export type NavbarProps = {
	menu: Menu;
	allContacts: AllContactsQuery['allContacts'];
};

const invertTopRoutes = ['/', '/manifest'];

export default function Navbar({ menu, allContacts }: NavbarProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const prevScroll = useRef<number | null>(null);
	const pathname = usePathname();
	const nav = menu.filter(({ id }) => id !== 'contact');
	const contact = menu.find(({ id }) => id === 'contact');
	const [invert, setInvert] = useState(true);
	const [selected, setSelected] = useState<string | null>(null);
	const [showContact, setShowContact] = useState(false);
	const { scrollY } = useScroll();
	const [hide, setHide] = useState(false);
	const canInvertTop = invertTopRoutes.includes(pathname);

	useMotionValueEvent(scrollY, 'change', (latest) => {
		const documentHeight = document.documentElement.scrollHeight;
		const viewportHeight = window.innerHeight;
		const triggerPoint = documentHeight - viewportHeight - 50;
		setHide(latest > 50 && prevScroll.current !== null && latest > prevScroll.current);
		prevScroll.current = latest;
		setInvert(latest >= triggerPoint || (canInvertTop && latest < viewportHeight));
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
								pathname.startsWith(slug) && s.active,
								hide && s.hide
							)}
							style={{ transitionDelay: `${(0.1 / nav.length) * (nav.length - i)}s` }}
							onMouseEnter={() => sub && setSelected(id)}
						>
							{sub ? <span>{title}</span> : <Link href={slug ?? href}>{title}</Link>}
						</li>
					))}
				</ul>
				<ul className={s.contact}>
					<li
						className={cn(contact.slug === pathname && s.active, showContact && s.hidden)}
						onClick={() => setShowContact(true)}
					>
						<span>{contact.title}</span>
					</li>
					<ContactPopup
						allContacts={allContacts}
						show={showContact}
						onClose={() => setShowContact(false)}
					/>
				</ul>
			</nav>
		</>
	);
}
