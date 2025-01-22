'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	duration: number
	delay?: number
}

const FadeRight = ({ children, duration, delay, ...props}: Props) => {
	return (
		<motion.div
			initial={{ x: -200, opacity: 0 }}
			animate={{
				opacity: 1,
				x: 0,
			}}
			transition={{
				type: 'spring',
				stiffness: 100,
				duration,
				delay,
			}}
			{...props}
		>
			{children}
		</motion.div>
	)
}

export default FadeRight
