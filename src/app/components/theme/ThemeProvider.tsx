'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes/dist/types'
import { useEffect, useState } from 'react'

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
	const [isClient, setIsClient] = useState(false)
	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		isClient && <NextThemesProvider {...props}>{children}</NextThemesProvider>
	)
}

export { ThemeProvider }
