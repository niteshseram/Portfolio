import * as React from 'react'

import RoundedImage from './RoundedImage'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Link } from '@/src/i18n/routing'

const CustomLink = (props: any) => {
	const href = props.href

	if (href.startsWith('/')) {
		return (
			<Link href={href} {...props}>
				{props.children}
			</Link>
		)
	}

	if (href.startsWith('#')) {
		return <a {...props} />
	}

	return <a target='_blank' rel='noopener noreferrer' {...props} />
}

const components = {
	Image: RoundedImage,
	a: CustomLink,
}

interface MdxProps {
	code: string
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code)

	return (
		<article className='prose prose-quoteless prose-neutral dark:prose-invert mb-2'>
			<Component components={{ ...components }} />
		</article>
	)
}
