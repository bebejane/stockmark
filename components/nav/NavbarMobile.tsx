'use client';

import s from './NavbarMobile.module.scss';
import cn from 'classnames';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useEffect, useRef, useState } from 'react';
import { Menu, getSelectedMenuItem } from '@/lib/menu';
import Hamburger from 'hamburger-react';

export type NavbarMobileProps = {
	menu: Menu;
	allContacts: AllContactsQuery['allContacts'];
};

export default function NavbarMobile({ menu, allContacts }: NavbarMobileProps) {
	const pathname = usePathname();
	const locale = useLocale();
	const contactContentRef = useRef<HTMLDivElement>(null);
	const [selected, setSelected] = useState<string | null>(
		getSelectedMenuItem(menu, pathname)?.id ?? null
	);
	const [open, setOpen] = useState(false);
	const nav = menu.filter(({ id }) => id !== 'contact');
	const contact = menu.find(({ id }) => id === 'contact');

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return (
		<>
			<div className={cn(s.topbar, open && s.open)}>
				<figure className={s.logo}>
					<Link href={'/'}>
						<img src={'/images/logo.svg'} alt='Logo' />
					</Link>
				</figure>
				<div className={s.hamburger}>
					<Hamburger
						toggled={open}
						color={open ? 'white' : 'black'}
						size={20}
						onToggle={(state) => setOpen(state)}
					/>
				</div>
			</div>
			<nav className={cn(s.navbarMobile, open && s.open)}>
				<ul className={s.menu}>
					{nav.map(({ id, title, slug }) => (
						<li
							key={id}
							className={cn(selected === id && s.active)}
							onClick={() => setSelected(selected === id ? null : id)}
						>
							<Link href={slug}>{title}</Link>
						</li>
					))}
					<li
						className={cn(s.contact, selected === contact.id && s.active)}
						onClick={() => {
							setSelected(
								selected === contact.id
									? menu.find(({ slug }) => slug === pathname)?.id
									: contact.id
							);
						}}
					>
						<span>{contact.title}</span>
						<div
							className={s.content}
							ref={contactContentRef}
							style={{
								height:
									selected === contact.id ? `${contactContentRef.current?.scrollHeight}px` : 0,
							}}
						>
							<p>
								Stockmark AB
								<br />
								Kungsgatan 9
								<br />
								111 43 Stockholm
								<br />
								<a href='mailto:info@stockmark.se'>info@stockmark.se</a>
							</p>
							<ul>
								{allContacts?.map(({ name, email, phone, portrait }, i) => (
									<li key={i}>
										<div className={s.name}>
											{name}
											<br />
											<span className='small'>
												<a href={`mailto:${email}`}>{email}</a>
											</span>
										</div>
										<div className={cn(s.phone, 'small')}>{phone}</div>
									</li>
								))}
							</ul>
						</div>
					</li>
					<li onClick={() => setSelected(null)}>
						<Link href={`/`} locale={locale === 'en' ? 'sv' : 'en'}>
							<span>{locale === 'en' ? 'SV' : 'EN'}</span>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
