'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import ThemeSwitch from './ThemeSwitch'
import AnimatedText from './AnimatedText'
import Logo from './Logo'

import { NAV_ITEMS } from '@/src/constants'

const NavBar = () => {
	const pathname = usePathname()

	return (
		<nav className='
			fixed top-2 left-1/2 max-w-[44em] w-[96vw]
			sm:w-[96vw] mx-auto -translate-x-1/2 flex flex-col
			transition-all rounded-lg p-[10px] bg-primary/10 backdrop-blur-[10px] backdrop-saturate-150 
			hover:shadow-dark border border-secondary/20 z-10
		'>
			<div className='h-[40px] bg-transparent py-5 flex items-center justify-between'>
				<Link
					href='/'
					className='flex items-center justify-between'
					aria-label='Home'
				>
					<Logo />
				</Link>
				<div className='flex items-center gap-8 text-base leading-5'>
					<div className='flex gap-8'>
						{NAV_ITEMS.map((item, idx) => {
							const active = pathname === item.page
							return (
								<Link
									key={idx}
									href={item.page}
									className={clsx('horizontal-underline text-base', {
										'horizontal-underline-active font-bold': active,
									})}
									aria-label={item.label}
								>
									<span className='tracking-wide text-gray-900 dark:text-gray-100'>
										<AnimatedText text={item.label} />
									</span>
								</Link>
							)
						})}
					</div>
					<ThemeSwitch />
				</div>
			</div>
		</nav>
	)
}

export default NavBar
