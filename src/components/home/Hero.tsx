'use client'
import { ReactElement } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'

import RoundedImage from '../RoundedImage'
import AnimatedText from '../AnimatedText'


export default function Hero(): ReactElement {

	return (
		<section>
			<h1 className='sr-only'>
				Hi I&apos;m Nitesh Seram, I&apos;m a software engineer and I craft
				things for the web.
			</h1>
			<div className='flex cursor-default flex-col justify-center'>
				<div className='flex gap-8'>
					<RoundedImage
						src='/dp.png'
						alt='profile picture'
						quality={95}
						priority={true}
						width={64}
						height={64}
						style={{ objectFit: 'contain' }}
					/>
					<div className='flex flex-col justify-center'>
						<h1 className='text-3xl lg:text-4xl font-medium text-dark dark:text-light name-highlight'>
							<AnimatedText text='Nitesh Seram' />
						</h1>
						<h4 className='text-base lg:text-lg'>
							Software Engineer @ <b>Auzmor</b>
						</h4>
					</div>
				</div>
				<div className='flex flex-col gap-8 pt-8'>
					<p className='text-base md:text-lg'>
						Hello, I&apos;m a Software Engineer with passion for creating
						user-friendly and complex web applications. I&apos;m also an avid
						open-source contributor and trying to learn from best minds out
						there through open source.
					</p>
					<Link href='/about'>
						<div className='flex items-center'>
							<span className='link'>Learn more&nbsp;</span>
							<span className='animate-bounce-right'>
								<FiArrowRight />
							</span>
						</div>
					</Link>
				</div>
			</div>
		</section>
	)
}
