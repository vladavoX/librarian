'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function News() {
	const { status } = useSession()
	const router = useRouter()

	return <main className='flex min-h-screen flex-col w-full bg-muted/40'>Djoka</main>
}
