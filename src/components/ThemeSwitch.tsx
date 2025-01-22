import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi'

import { useMounted } from '@/src/hooks/useMounted'

const ThemeSwitch = () => {
	const mounted = useMounted()
	const { systemTheme, theme, setTheme } = useTheme()
	const currentTheme = theme === 'system' ? systemTheme : theme

	return (
		<button
			aria-label={theme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'}
			className='p-3 bg-slate-300 rounded dark:bg-slate-800 rounded-xl w-[40px] h-[40px]'
			title={theme === 'dark' ? 'Enable Light Theme' : 'Enable Dark Theme'}
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			{mounted && (currentTheme === 'dark' ? <FiSun /> : <FiMoon />)}
		</button>
	)
}

export default ThemeSwitch
