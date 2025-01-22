import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/src/lib/prisma'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const slug = req.query?.slug as string
		if (!slug) {
			return res.status(400).json({ message: 'Slug is required.' })
		}
		const { method } = req

		if (method === 'POST') {
			const newOrUpdatedViews = await prisma.views.upsert({
				where: { slug },
				create: {
					slug,
				},
				update: {
					count: {
						increment: 1,
					},
				},
			})

			return res.status(200).json({
				total: newOrUpdatedViews.count.toString(),
			})
		}

		if (method === 'GET') {
			const views = await prisma.views.findUnique({
				where: {
					slug,
				},
			})

			return res.status(200).json({ total: views?.count.toString() })
		}
	} catch (e: any) {
		return res.status(500).json({ message: e.message })
	}
}
