'use client'

import clsx from 'clsx'
import { useLocale } from 'next-intl'
import { ChangeEvent, useId, useTransition } from 'react'
import { routing, usePathname, useRouter } from '@/src/i18n/routing'
import { useParams } from 'next/navigation'

export default function I18nSelect() {
	const id = useId()
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const pathname = usePathname()
	const params = useParams()
	const locale = useLocale()

	const localeLabel = {
		en: 'English',
		de: 'Deutsch',
	}

	function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const nextLocale = event.target.value
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: nextLocale }
			)
		})
	}

	return (
		<label
			className={clsx(
				'relative text-gray-400',
				'size-fit',
				isPending && 'transition-opacity [&:disabled]:opacity-30'
			)}
		>
			<p className='sr-only'>Language</p>
			<select
				className={clsx('inline-flex appearance-none bg-transparent py-3 pl-2 pr-6')}
				defaultValue={locale}
				disabled={isPending}
				onChange={onSelectChange}
			>
				{routing.locales.map((cur) => (
					<option key={cur} value={cur}>
						{localeLabel[cur]}
					</option>
				))}
			</select>
			<span className='pointer-events-none absolute right-2 top-[8px]'>⌄</span>
		</label>
	)
}
