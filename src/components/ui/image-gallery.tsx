'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageGalleryProps {
	images: Array<{
		id: number;
		src: string;
		alt: string;
		ratio?: number;
	}>;
}

export function ImageGallery({ images }: ImageGalleryProps) {
	// Distribute images into 3 columns
	const columns: typeof images[][] = [[], [], []];
	
	images.forEach((image, index) => {
		columns[index % 3].push(image);
	});

	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center py-10 px-4">
			<div className="mx-auto grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{columns.map((columnImages, col) => (
					<div key={col} className="grid gap-6">
						{columnImages.map((image) => {
							const ratio = image.ratio || (Math.random() > 0.5 ? 9 / 16 : 16 / 9);
							
							return (
								<AnimatedImage
									key={image.id}
									alt={image.alt}
									src={image.src}
									ratio={ratio}
									placeholder={`https://placehold.co/800x600/`}
								/>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}

interface AnimatedImageProps {
	alt: string;
	src: string;
	className?: string;
	placeholder?: string;
	ratio: number;
}

function AnimatedImage({ alt, src, ratio, placeholder }: AnimatedImageProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true });
	const [isLoading, setIsLoading] = React.useState(true);
	const [imgSrc, setImgSrc] = React.useState(src);

	const handleError = () => {
		if (placeholder) {
			setImgSrc(placeholder);
		}
	};

	return (
		<AspectRatio
			ref={ref}
			ratio={ratio}
			className="bg-accent relative size-full rounded-lg border"
		>
			<img
				alt={alt}
				src={imgSrc}
				className={cn(
					'size-full rounded-lg object-cover opacity-0 transition-all duration-1000 ease-in-out',
					{
						'opacity-100': isInView && !isLoading,
					},
				)}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
				onError={handleError}
			/>
		</AspectRatio>
	);
}

