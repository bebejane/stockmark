import s from './Hero.module.scss';
import cn from 'classnames';
import { VideoPlayer } from 'next-dato-utils/components';

export type HeroProps = {
	video: FileField;
};
export default function Hero({ video }: HeroProps) {
	const rows = ['Kaffe. Prata. Mycket.', 'Ofta. Länge. Tänka.', 'Full gas. Tillsammans. Repetera.'];
	return (
		<section className={s.hero}>
			<VideoPlayer className={s.video} data={video} autoPlay={true} />
			<div className={s.text}>
				{rows.map((row, i) => (
					<div className={s.row}>
						<h2 key={i}>{row}</h2>
					</div>
				))}
			</div>
		</section>
	);
}
