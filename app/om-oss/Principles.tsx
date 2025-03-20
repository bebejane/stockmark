'use client';

import s from './Principles.module.scss';
import cn from 'classnames';
import Content from '@components/content/Content';
import { motion, stagger } from 'framer-motion';
import RevealHeader from '@components/common/RevealHeader';

export type Props = {
	about: AboutQuery['about'];
};

export default function Principles({ about }: Props) {
	return (
		<section className={s.principles}>
			<RevealHeader size={2}>{about.headlinePrinciples}</RevealHeader>
			<ul className='grid-2'>
				{about.principles.map((principle, i) => (
					<li key={i} className='grid-6'>
						<div className={cn('number', s.number)}>
							<div className={s.wrap}>
								<motion.span
									whileInView='visible'
									viewport={{ once: false }}
									variants={{
										hidden: { y: '100%' },
										visible: {
											y: '0%',
											transition: {
												delay: 0.1 * i,
												type: 'spring',
												stiffness: 50,
												mass: 0.3,
											},
										},
									}}
									initial='hidden'
								>
									{i + 1}
								</motion.span>
							</div>
						</div>
						<div className={s.content}>
							<h3>{principle.title}</h3>
							<Content content={principle.text} />
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
