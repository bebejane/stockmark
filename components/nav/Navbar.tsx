'use client';

import s from './Navbar.module.scss';
import cn from 'classnames';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Menu } from '@/lib/menu';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import ContactPopup from '@components/nav/ContactPopup';

export type NavbarProps = {
	menu: Menu;
	allContacts: AllContactsQuery['allContacts'];
};

export default function Navbar({ menu, allContacts }: NavbarProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const pathname = usePathname();
	const invert = pathname === '/';
	const [selected, setSelected] = useState<string | null>(null);
	const [showContact, setShowContact] = useState(false);
	const { scrollY } = useScroll();
	const [hide, setHide] = useState(false);

	useMotionValueEvent(scrollY, 'change', (latest) => {
		setHide(latest > 50);
	});

	const parent = menu.find(({ id }) => id === selected);
	const sub = parent?.sub;
	const nav = menu.filter(({ id }) => id !== 'contact');
	const contact = menu.find(({ id }) => id === 'contact');

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
							style={{ animationDelay: `${(0.5 / nav.length) * (nav.length - i)}s` }}
							onMouseEnter={() => sub && setSelected(id)}
						>
							{sub ? <span>{title}</span> : <Link href={slug ?? href}>{title}</Link>}
						</li>
					))}
				</ul>
				<ul className={s.contact}>
					<li
						className={cn(contact.slug === pathname && s.active)}
						onClick={() => setShowContact(true)}
					>
						{contact.title}
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
