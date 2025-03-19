'use client';

import s from './Navbar.module.scss';
import cn from 'classnames';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Menu } from '@/lib/menu';
import { useMotionValueEvent, useScroll } from 'framer-motion';

export type NavbarProps = {
	menu: Menu;
};

export default function Navbar({ menu }: NavbarProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const pathname = usePathname();
	const invert = pathname === '/';
	const [selected, setSelected] = useState<string | null>(null);
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
					<li className={cn(contact.slug === pathname && s.active)}>{contact.title}</li>
				</ul>
			</nav>
			<nav className={cn(s.sub, sub && s.open)} onMouseLeave={() => setSelected(null)}>
				<ul>
					{sub?.map(({ id, title, href, slug }) => (
						<li
							key={id}
							className={cn((slug === pathname || pathname.startsWith(slug)) && s.active)}
						>
							<Link href={slug ?? href} onClick={() => setSelected(null)}>
								{title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
