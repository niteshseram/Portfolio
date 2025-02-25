import { allBlogs } from 'contentlayer/generated'

export default async function sitemap() {
	const blogs = allBlogs.map((post) => ({
		url: `https://niteshseram.in/blog/${post.slug}`,
		lastModified: post.publishedAt,
	}))

	const routes = ['', '/about', '/blog',].map(
		(route) => ({
			url: `https://niteshseram.in${route}`,
			lastModified: new Date().toISOString().split('T')[0],
		})
	)

	return [...routes, ...blogs]
}
