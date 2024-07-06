'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
	const { status } = useSession()
	const router = useRouter()

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="text-xl">Home</h1>
		</main>
	)
}
