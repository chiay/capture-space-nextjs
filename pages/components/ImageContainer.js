import React, { useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';

export default function ImageContainer({ image }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="w-max flex align-center border-2 border-gray-600 rounded m-2 cursor-pointer transform transition-all duration-200 hover:scale-105">
			<Image
				src={`data:${image.data.type};base64,${image.data.image}`}
				alt={image.data.name}
				width={150}
				height={150}
				className="object-cover"
				onClick={() => setOpen(true)}
			/>
			<ImageModal image={image} open={open} setOpen={setOpen} />
		</div>
	);
}
