import type { Metadata } from 'next'
import { allBlogs } from 'contentlayer/generated'

import BlogList from '@/src/components/blog/BlogList'
import AnimatedText from '@/src/components/AnimatedText'
import FadeDown from '@/src/components/animations/FadeDown'

export const metadata: Metadata = {
	title: 'Blog',
	description:
		'Sharing learnings and thoughts on software development and beyond through my blog',
}

export default async function BlogPage() {
	return (
		<section className='min-h-screen my-10'>
			<FadeDown duration={0.4}>
				<h1 className='heading custom-underline mb-6'>
					<AnimatedText text='My Blog' />
				</h1>
				<p className='text-base md:text-lg mb-8'>
					Sharing learnings and thoughts on software development and beyond
					through my blog
				</p>
			</FadeDown>
			<BlogList
				blogs={allBlogs.sort((a, b) => {
					if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
						return -1
					}
					return 1
				})}
			/>
		</section>
	)
}
