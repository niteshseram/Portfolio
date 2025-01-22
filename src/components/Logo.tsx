const Logo = ({ width = '32px', height = '32px' }) => {
	return (
		<div className='text-gray-900 dark:text-gray-100'>
			<svg
				version='1.0'
				xmlns='http://www.w3.org/2000/svg'
				width={width}
				height={height}
				viewBox='0 0 188.000000 200.000000'
				preserveAspectRatio='xMidYMid meet'
			>
				<g
					transform='translate(0.000000,200.000000) scale(0.100000,-0.100000)'
					fill='currentColor'
					stroke='none'
				>
					<path d='M90 1000 l0 -910 360 0 360 0 0 910 0 910 -360 0 -360 0 0 -910z' />
					<path
						d='M1060 1001 l0 -911 370 0 370 0 0 668 c-1 750 -3 774 -66 900 -84
	165 -239 238 -526 249 l-148 6 0 -912z'
					/>
				</g>
			</svg>
		</div>
	)
}
export default Logo
