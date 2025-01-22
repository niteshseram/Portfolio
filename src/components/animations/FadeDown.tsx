
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	duration: number
	delay?: number
}

const FadeDown = ({ children, duration, delay }: Props) => {
	return (
		<motion.div
			initial={{ y: -50, opacity: 0 }}
			animate={{
				opacity: 1,
				y: 0,
			}}
			transition={{
				type: 'spring',
				damping: 12,
				stiffness: 100,
        duration,
        delay,
			}}
		>
			{children}
		</motion.div>
	)
}

export default FadeDown
