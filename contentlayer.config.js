import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import path from 'node:path'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
	slug: {
		type: 'string',
		resolve: (doc) => doc._raw.flattenedPath.split(path.posix.sep)[0],
	},
	locale: {
		description: 'Locale of document',
		resolve: (doc) =>
			doc._raw.sourceFileName.replace(
				path.extname(doc._raw.sourceFileName),
				''
			),
		type: 'string',
	},
	structuredData: {
		type: 'object',
		resolve: (doc) => ({
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: doc.title,
			datePublished: doc.publishedAt,
			dateModified: doc.publishedAt,
			description: doc.summary,
			image: doc.image
				? `https://niteshseram.in${doc.image}`
				: `https://niteshseram.in/api/og?title=${doc.title}`,
			url: `https://niteshseram.in/blog/${doc._raw.flattenedPath}`,
			author: {
				'@type': 'Person',
				name: 'Nitesh Seram',
			},
		}),
	},
}

export const Blog = defineDocumentType(() => ({
	name: 'Blog',
	filePathPattern: `**/*.md`,
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			required: true,
		},
		publishedAt: {
			type: 'string',
			required: true,
		},
		summary: {
			type: 'string',
			required: true,
		},
		image: {
			type: 'string',
		},
	},
	computedFields,
}))

export default makeSource({
	contentDirPath: 'src/content',
	documentTypes: [Blog],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: 'one-dark-pro',
					onVisitLine(node) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children.length === 0) {
							node.children = [{ type: 'text', value: ' ' }]
						}
					},
					onVisitHighlightedLine(node) {
						node.properties.className.push('line--highlighted')
					},
					onVisitHighlightedWord(node) {
						node.properties.className = ['word--highlighted']
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['anchor'],
					},
				},
			],
		],
	},
})
