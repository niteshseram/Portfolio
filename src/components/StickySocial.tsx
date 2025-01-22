'use client'

import React from 'react'
import { motion } from 'framer-motion'

import FadeUp from './animations/FadeUp'

import { SOCIAL } from '@/src/constants'
import { Link } from '@/src/i18n/routing'

const StickySocial = () => {
	return (
		<div className='hidden lg:flex fixed top-[50%] lg:right-[20px] xl:right-[40px] translate-y-[-104px] flex-col items-center gap-12'>
			{SOCIAL.map((social, idx) => (
				<FadeUp duration={0.6} delay={0.2 * idx} key={idx}>
					<Link
						aria-label={social.label}
						href={social.href}
						target='_blank'
						title={social.label}
						className='
              flex
              border-solid 
              border-2 
              dark:border-primary/50
              dark:hover:border-primary 
              border-secondary/50
              hover:border-secondary
              transition 
              rounded-full
              dark:hover:text-light
              dark:text-slate-500
              text-gray-500
              hover:text-gray-900
							h-10
							w-10
							items-center
							justify-center
            '
					>
						<motion.div
							className='logo'
							whileHover={{ rotate: 360, scale: 1.2 }}
							transition={{ duration: 0.25 }}
						>
							{React.createElement(social.icon, {
								className: 'h-8 w-8 pointer-events-auto p-2',
							})}
						</motion.div>
					</Link>
				</FadeUp>
			))}
		</div>
	)
}

export default StickySocial
