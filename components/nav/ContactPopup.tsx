import s from './ContactPopup.module.scss';
import cn from 'classnames';

export type ContactPopupProps = {
	show: boolean;
	onClose: () => void;
	allContacts: AllContactsQuery['allContacts'];
};

export default function ContactPopup({ allContacts, show, onClose }: ContactPopupProps) {
	return (
		<div className={cn(s.popup, show && s.show)}>
			<div className={s.header}>
				<span>Kontakt</span>
				<button onClick={onClose}>Stäng</button>
			</div>
			<p>
				Stockmark AB Kungsgatan 9
				<br />
				111 43 Stockholm
				<br />
				<a href='mailto:info@stockmark.se'>info@stockmark.se</a>
			</p>
			<ul>
				{allContacts?.map(({ name, email, phone, portrait }) => (
					<li key={name}>
						<div className={s.name}>
							<b>{name}</b>
							<br />
							{email}
						</div>
						<div className={s.phone}>{phone}</div>
					</li>
				))}
			</ul>
		</div>
	);
}
