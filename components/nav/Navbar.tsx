'use client';

import s from './Navbar.module.scss';
import cn from 'classnames';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Menu } from '@/lib/menu';

export type NavbarProps = {
	menu: Menu;
};

export default function Navbar({ menu }: NavbarProps) {
	const path = usePathname();
	const qs = useSearchParams().toString();
	const pathname = `${path}${qs.length > 0 ? `?${qs}` : ''}`;
	const [selected, setSelected] = useState<string | null>(null);

	const parent = menu.find(({ id }) => id === selected);
	const sub = parent?.sub;
	const contact = menu.find(({ id }) => id === 'contact');

	return (
		<>
			<nav className={cn(s.navbar, s.inverted)}>
				<figure className={s.logo}>
					<Link href={'/'}>
						<img src='/images/logo.svg' alt='Logo' />
					</Link>
				</figure>

				<ul className={s.menu}>
					{menu
						.filter(({ id }) => id !== 'contact')
						.map(({ id, title, href, slug, sub }) => (
							<li
								key={id}
								className={cn(s.item, sub && s.dropdown, pathname.startsWith(slug) && s.active)}
								onMouseEnter={() => sub && setSelected(id)}
							>
								{sub ? <span>{title}</span> : <Link href={slug ?? href}>{title}</Link>}
							</li>
						))}
				</ul>
				<ul className={s.contact}>
					<li className={cn(contact.slug === pathname && s.active)}>
						<Link href={'/kontakt'}>{contact.title}</Link>
					</li>
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
