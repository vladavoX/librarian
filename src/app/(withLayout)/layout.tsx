import { getServerSession } from 'next-auth'
import { Header } from '../components/navigation/Header'
import { SideNav } from '../components/navigation/SideNav'
import { getUser } from '@/app/fetch'

export default async function PagesLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession()
	const user = await getUser(session?.user?.email || '')

	return (
		<>
			<SideNav userId={user?._id} />
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<Header />
				{children}
			</div>
		</>
	)
}
