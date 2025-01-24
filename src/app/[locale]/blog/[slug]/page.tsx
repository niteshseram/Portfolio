import type { Metadata } from 'next'
import { parseISO, format } from 'date-fns'
import { notFound } from 'next/navigation'

import { allBlogs } from 'contentlayer/generated'
import { Mdx } from '@/src/components/mdx'
import ViewCounter from '../view-counter'
import Reaction from '@/src/components/blog/Reaction'
import FadeDown from '@/src/components/animations/FadeDown'
import FadeUp from '@/src/components/animations/FadeUp'

interface Params {
	slug: string
	locale: string
}

export async function generateStaticParams() {
	return allBlogs.map((post) => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: Params
}): Promise<Metadata | undefined> {
	const post = allBlogs.find(
		(post) => post.slug === params.slug && post.locale === params.locale
	)
	if (!post) {
		return
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
		slug,
	} = post
	const ogImage = image
		? `https://niteshseram.in${image}`
		: `https://niteshseram.in/api/og?title=${title}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://niteshseram.in/blog/${slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	}
}

interface BlogProps {
	params: Params
}

export default async function Blog({ params }: BlogProps) {
	const post = allBlogs.find(
		(post) => post.slug === params.slug && post.locale === params.locale
	)

	if (!post) {
		notFound()
	}

	return (
		<section className='mb-10 mt-10'>
			<script type='application/ld+json' suppressHydrationWarning>
				{JSON.stringify(post.structuredData)}
			</script>
			<FadeDown duration={0.2}>
				<h1 className='font-bold heading mb-2'>{post.title}</h1>
				<div className='mt-4 text-sm mb-8 flex flex-col gap-4'>
					<div className='text-slate-700 dark:text-slate-400'>
						{format(parseISO(post.publishedAt), 'MMMM dd, yyyy')} /{' '}
						{post.readingTime.text} / <ViewCounter slug={post.slug} trackView />
					</div>
					<Reaction slug={post.slug} />
				</div>
			</FadeDown>
			<FadeUp duration={0.2}>
				<Mdx code={post.body.code} />
				<div className='pt-4 md:pt-8 flex justify-center'>
					<Reaction slug={post.slug} />
				</div>
			</FadeUp>
		</section>
	)
}
