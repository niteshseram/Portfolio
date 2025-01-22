import { IconType } from 'react-icons'
import { FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi'

type NavItem = {
	label: string
	page: string
}

export const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'Home',
		page: '/',
	},
	{
		label: 'About',
		page: '/about',
	},
	{
		label: 'Blog',
		page: '/blog',
	},
]

type SocialItem = {
	label: string
	href: string
	icon: IconType
}

export const SOCIAL: Array<SocialItem> = [
	{
		label: 'LinkedIn',
		href: 'https://linkedin.com/in/niteshseram',
		icon: FiLinkedin,
	},
	{
		label: 'Twitter',
		href: 'https://twitter.com/niteshseram',
		icon: FiTwitter,
	},
	{
		label: 'Github',
		href: 'https://github.com/niteshseram',
		icon: FiGithub,
	},
]

export const REACTION = {
	like: "LIKE",
	love: "LOVE"
}