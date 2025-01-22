import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const config = {
	runtime: 'edge',
}

export default async function handler(req: NextRequest) {
	const { searchParams } = req.nextUrl
	const postTitle = searchParams.get('title')

	return new ImageResponse(
		(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'center',
					backgroundImage: 'url(https://niteshseram.in/og-bg.png)',
				}}
			>
				<div
					style={{
						marginLeft: 108,
						marginRight: 108,
						display: 'flex',
						fontSize: 60,
						fontFamily: 'Inter',
						letterSpacing: '-0.05em',
						fontStyle: 'normal',
						color: 'white',
						lineHeight: '60px',
						whiteSpace: 'pre-wrap',
					}}
				>
					{postTitle}
				</div>
			</div>
		),
		{
			width: 1920,
			height: 1080,
		}
	)
}
