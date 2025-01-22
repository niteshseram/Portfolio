import NowPlaying from './NowPlaying'
import I18nSelect from './I18nSelect'
import { Link } from '@/src/i18n/routing'

const navigation = {
	general: [
		{ name: 'Home', title: 'Home Page', href: '/' },
		{ name: 'About', title: 'About Page', href: '/about' },
		{ name: 'Blog', title: 'Blog Page', href: '/blog' },
	],
	extra: [
		{
			name: 'Source',
			title: 'View source code on Github',
			href: 'https://github.com/niteshseram/niteshseram.in',
		},
		{
			name: 'Resume',
			title: 'View my resume',
			href: 'https://drive.google.com/file/d/1uQxjmAY-mVyv-4F_oyrQitvzfCxVUka3/view',
		},
	],
	social: [
		{
			name: 'Twitter',
			title: 'View Twitter',
			href: 'https://twitter.com/niteshseram',
		},
		{
			name: 'LinkedIn',
			title: 'View LinkedIn',
			href: 'https://linkedin.com/in/niteshseram',
		},
		{
			name: 'GitHub',
			title: 'View Github',
			href: 'https://github.com/niteshseram',
		},
	],
}

const Footer = () => (
	<footer>
		<div className='py-10 border-t-2 border-gray-200 dark:border-gray-700'>
			<div className='grid grid-cols-3 gap-8'>
				<div className='md:grid col-span-2 md:grid-cols-2 md:gap-8'>
					<div>
						<h3 className='text-sm font-semibold tracking-wider uppercase'>
							Pages
						</h3>
						<div role='list' className='mt-4 flex flex-col items-start'>
							{navigation.general.map((item) => (
								<FooterLink
									key={item.name}
									name={item.name}
									title={item.title}
									href={item.href}
								/>
							))}
						</div>
					</div>
					<div className='mt-12 md:mt-0'>
						<h3 className='text-sm font-semibold tracking-wider uppercase'>
							Socials
						</h3>
						<div role='list' className='mt-4 flex flex-col items-start'>
							{navigation.social.map((item) => (
								<FooterLink
									key={item.name}
									name={item.name}
									title={item.title}
									href={item.href}
									newTab
								/>
							))}
						</div>
					</div>
				</div>
				<div className='md:grid md:grid-cols-1 md:gap-8'>
					<div>
						<h3 className='text-sm font-semibold tracking-wider uppercase'>
							Extra
						</h3>
						<div role='list' className='mt-4 flex flex-col items-start'>
							{navigation.extra.map((item) => (
								<FooterLink
									key={item.name}
									name={item.name}
									title={item.title}
									href={item.href}
									newTab
								/>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='grid  md:grid-cols-3 items-center gap-y-2 mt-12'>
				<div className='flex items-start flex-col col-span-1'>
					<NowPlaying />
					<p className='text-base font-medium'>
						&copy; {new Date().getFullYear()} Nitesh Seram
					</p>
				</div>
				<I18nSelect />
			</div>
		</div>
	</footer>
)

interface FooterLinkProps {
	href: string
	name: string
	title?: string
	newTab?: boolean
}

const FooterLink = ({ href, name, title, newTab }: FooterLinkProps) => (
	<Link
		href={href}
		className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mt-2 horizontal-underline tracking-wide'
		aria-label={name}
		title={title}
		{...(newTab && {
			target: '_blank',
			rel: 'noopener noreferrer',
		})}
	>
		{name}
	</Link>
)
export default Footer
