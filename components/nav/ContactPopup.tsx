'use client';

import { useRef } from 'react';
import s from './ContactPopup.module.scss';
import cn from 'classnames';
import { useOutsideClick } from 'rooks';

export type ContactPopupProps = {
	show: boolean;
	onClose: () => void;
	allContacts: AllContactsQuery['allContacts'];
};

export default function ContactPopup({ allContacts, show, onClose }: ContactPopupProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	useOutsideClick(ref, onClose);

	return (
		<div className={cn(s.popup, show && s.show)} ref={ref}>
			<div className={s.header}>
				<span>Kontakt</span>
				<button onClick={onClose}>Stäng</button>
			</div>
			<div className={s.content}>
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
		</div>
	);
}
