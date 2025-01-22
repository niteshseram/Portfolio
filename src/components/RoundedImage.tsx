'use client'
import {useState} from 'react';
import clsx from 'clsx';
import Image from 'next/image';

const RoundedImage = (props: any) => {
	const [isLoading, setLoading] = useState(true)

	return (
		<div
			className={clsx(
				"relative flex overflow-hidden rounded-lg after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-lg after:content-['']",
				isLoading ? 'animate-pulse bg-white/[2%]' : ''
			)}
		>
			<Image
				{...props}
				alt={props.alt}
				className={clsx(
					'rounded-lg duration-700 ease-in-out',
					isLoading
						? 'scale-[1.02] blur-lg grayscale'
						: 'scale-100 blur-0 grayscale-0'
				)}
				onLoadingComplete={() => setLoading(false)}
			/>
		</div>
	)
}

export default RoundedImage;
