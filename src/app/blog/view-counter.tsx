'use client'

import useSWR from 'swr'
import { useEffect } from 'react'

import fetcher from '@/src/lib/fetcher'

type PostView = {
	slug: string
	total: string
}

export default function ViewCounter({
	slug,
	trackView,
}: {
	slug: string
	trackView: boolean
}) {
	const { data } = useSWR<PostView>(`/api/views/${slug}`, fetcher)
	const views = new Number(data?.total || 0)

	useEffect(() => {
		const registerView = () =>
			fetch(`/api/views/${slug}`, {
				method: 'POST',
			})

		if (trackView && process.env.NODE_ENV === 'production') {
			registerView()
		}
	}, [slug, trackView])

	return <span>{data ? `${views.toLocaleString()} views` : '- views​'}</span>
}
