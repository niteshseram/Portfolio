import { Link } from '@/src/i18n/routing'

export default function NotFound() {
	return (
		<div className='h-[calc(100vh-400px)] mt-10'>
			<h2 className='heading'>Post not found.</h2>
			<p className='mb-10'>
				Oops, it looks like you took a wrong turn! Don&apos;t worry, we&apos;ll
				get you back on track.
			</p>
			<p>
				This page may not exist on my website, but that doesn&apos;t mean we
				can&apos;t still connect. Feel free to explore the rest of my{' '}
				<Link className='link' href='/'>
					site
				</Link>
				. Let&apos;s turn this little detour into a fun and exciting adventure!
			</p>
		</div>
	)
}
