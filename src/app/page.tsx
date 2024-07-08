'use client'
import { Header } from './components/navigation/Header'
import { Suspense } from 'react'

export default function News() {
	return (
		<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
			<Suspense>
				<Header />
			</Suspense>
		</div>
	)
}
