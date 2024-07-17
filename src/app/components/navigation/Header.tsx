'use client'

import { updateUserTheme } from '@/actions/users'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import {
	BookText,
	Home,
	Library,
	Moon,
	PanelLeft,
	Search,
	Settings,
	Sun,
	SunMoon,
	User,
	Users2
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Header = () => {
	const session = useSession()
	const router = useRouter()
	const { theme, setTheme } = useTheme()

	const paths = usePathname()
	const pathNames = paths.split('/').filter((path) => path)

	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="outline" className="sm:hidden">
						<PanelLeft className="h-5 w-5" />
						<span className="sr-only">Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="sm:max-w-xs"
					aria-describedby="sheet-description"
				>
					<SheetHeader>
						<SheetTitle title="Librarian" />
						<SheetDescription aria-description="Librarian" />
					</SheetHeader>
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							href="/"
							className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
						>
							<Library className="h-5 w-5 transition-all group-hover:scale-110" />
							<span className="sr-only">Librarian</span>
						</Link>
						<Link
							href="/"
							className={cn(
								'flex items-center gap-4 px-2.5 hover:text-foreground',
								paths === '/' ? 'text-foreground' : 'text-muted-foreground'
							)}
						>
							<Home className="h-5 w-5" />
							Home
						</Link>
						<Link
							href="/my-books"
							className={cn(
								'flex items-center gap-4 px-2.5 hover:text-foreground',
								paths.includes('/notes')
									? 'text-foreground'
									: 'text-muted-foreground'
							)}
						>
							<BookText className="h-5 w-5" />
							My books
						</Link>
						<Link
							href="/people"
							className={cn(
								'flex items-center gap-4 px-2.5 hover:text-foreground',
								paths === '/people'
									? 'text-foreground'
									: 'text-muted-foreground'
							)}
						>
							<Users2 className="h-5 w-5" />
							People
						</Link>
						{isClient && (
							<Link
								href="#"
								className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground h-fit"
								onClick={async (e) => {
									e.preventDefault()
									setTheme(
										theme === 'system'
											? 'light'
											: theme === 'light'
												? 'dark'
												: 'system'
									)

									if (session.data?.user?.email)
										await updateUserTheme(
											session.data?.user?.email,
											theme === 'system'
												? 'light'
												: theme === 'light'
													? 'dark'
													: 'system'
										)
								}}
							>
								{theme === 'system' && (
									<>
										<SunMoon className="h-5 w-5" /> System
									</>
								)}
								{theme === 'light' && (
									<>
										<Sun className="h-5 w-5" /> Light
									</>
								)}
								{theme === 'dark' && (
									<>
										<Moon className="h-5 w-5" /> Dark
									</>
								)}
							</Link>
						)}
						<Link
							href="/settings"
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<Settings className="h-5 w-5" />
							Settings
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<Breadcrumb className="hidden md:flex">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Librarian</BreadcrumbLink>
					</BreadcrumbItem>
					{pathNames.map((path) => (
						<>
							<BreadcrumbSeparator key={path} />
							<BreadcrumbItem key={path}>
								<BreadcrumbLink href={`/${path}`}>{path}</BreadcrumbLink>
							</BreadcrumbItem>
						</>
					))}
				</BreadcrumbList>
			</Breadcrumb>
			<div className="relative ml-auto flex-1 md:grow-0">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search..."
					className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
				/>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="overflow-hidden rounded-full"
					>
						{session.data?.user?.image && (
							<Image
								src={session.data?.user?.image}
								width={36}
								height={36}
								alt="Avatar"
								className="overflow-hidden rounded-full"
							/>
						)}
						{!session.data?.user?.image && <User className="h-5 w-5" />}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							if (session.status === 'authenticated') {
								signOut({ redirect: false })
								toast({
									title: 'Logged out',
									description: 'You have been logged out.'
								})
							}
							session.status === 'unauthenticated' && router.push('/login')
						}}
					>
						{session.status === 'authenticated' && 'Logout'}
						{session.status === 'unauthenticated' && 'Login'}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	)
}

export { Header }
