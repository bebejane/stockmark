'use client';

import s from './AboutGallery.module.scss';
import { useState } from 'react';
import { Image } from 'react-datocms';
import { useIntervalWhen } from 'rooks';

export type Props = {
	images: FileField[];
};
export default function AboutGallery({ images: _images }: Props) {
	const [images, setImages] = useState<FileField[]>(_images);
	const [index, setIndex] = useState(0);

	useIntervalWhen(() => {
		setIndex(index + 1 >= images.length ? 0 : index + 1);
	}, 2000);

	return (
		<div className={s.gallery}>
			<Image data={images[index].responsiveImage} />
		</div>
	);
}
