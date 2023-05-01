'use client'

import { ThemeProvider } from 'next-themes'
import { ScrollObserver } from './ScrollObserver'

const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider attribute='class' enableSystem={false}>
			<ScrollObserver>{children}</ScrollObserver>
		</ThemeProvider>
	)
}

export default Provider
