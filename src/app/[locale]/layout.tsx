import type { Metadata } from 'next'
import clsx from 'clsx'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { NextIntlClientProvider } from 'next-intl'

import Navbar from '@/src/components/Navbar'
import Provider from '@/src/components/Provider'
import StickySocial from '@/src/components/StickySocial'

import '../globals.css'
import Footer from '@/src/components/Footer'
import { routing } from '@/src/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale } from 'next-intl/server'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
})

export const metadata: Metadata = {
	title: {
		default: 'Nitesh Seram',
		template: '%s | Nitesh Seram',
	},
	description: 'Software Engineer and Open Source enthusiast',
	openGraph: {
		title: 'Nitesh Seram',
		description: 'Software Engineer and Open Source enthusiast',
		url: 'https://niteshseram.in',
		siteName: 'Nitesh Seram',
		locale: 'en-US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		title: 'Nitesh Seram',
		card: 'summary_large_image',
	},
	icons: {
		shortcut: '/favicon.ico',
	},
	verification: {
		google: 'cTvq0i7fkRjh7wtvWKlnG42rayvxZBES7MzLl8CoC4k',
		yandex: '75318e4097177399',
	},
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	// Enable static rendering
	setRequestLocale(locale)

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body
				className={clsx('antialiased bg-light dark:bg-dark', inter.variable)}
			>
				<NextIntlClientProvider messages={messages}>
					<Provider>
						<Navbar />
						<div className='max-w-2xl w-[92vw] sm:w-[90vw] mx-auto pt-20'>
							<StickySocial />
							{children}
							<Footer />
							<Analytics />
						</div>
					</Provider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
