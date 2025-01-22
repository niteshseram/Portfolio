import { useState, useCallback, useEffect } from 'react'
import { useMounted } from './useMounted'

interface WindowDimensions {
	width: number
	height: number
}

export const useWindowDimensions = (): WindowDimensions => {
	const mounted = useMounted()
	const [dimens, setDimens] = useState<WindowDimensions>({
		width: 0,
		height: 0,
	})

	const handleResize = useCallback(() => {
		if (!mounted) return
		setDimens({ width: window.innerWidth, height: window.innerHeight })
	}, [mounted])

	useEffect(() => {
		if (mounted) {
			window.addEventListener('resize', handleResize)
			handleResize()
			return () => window.removeEventListener('resize', handleResize)
		}
	}, [mounted, handleResize])

	return dimens
}
