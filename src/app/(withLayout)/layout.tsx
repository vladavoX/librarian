import { Header } from '../components/navigation/Header'
import { SideNav } from '../components/navigation/SideNav'

export default function PagesLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<SideNav />
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<Header />
				{children}
			</div>
		</>
	)
}
