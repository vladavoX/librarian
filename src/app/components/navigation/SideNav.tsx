'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import { BookText, Home, Library, Moon, Settings, Sun, SunMoon, Users2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideNav = () => {
	const pathname = usePathname()
	const { theme, setTheme } = useTheme()

	return (
		<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
			<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
				<Link
					href='/'
					className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
				>
					<Library className='h-4 w-4 transition-all group-hover:scale-110' />
					<span className='sr-only'>Librarian</span>
				</Link>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href='/'
							className={cn(
								'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
								pathname === '/' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
							)}
						>
							<Home className='h-5 w-5' />
							<span className='sr-only'>Home</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side='right'>Home</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href='/notes'
							className={cn(
								'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
								pathname.includes('/notes') ? 'text-foreground bg-accent' : 'text-muted-foreground'
							)}
						>
							<BookText className='h-5 w-5' />
							<span className='sr-only'>My books</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side='right'>My books</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href='/people'
							className={cn(
								'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
								pathname === '/people' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
							)}
						>
							<Users2 className='h-5 w-5' />
							<span className='sr-only'>People</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side='right'>People</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							type='button'
							className='flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 text-muted-foreground'
							onClick={() => setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system')}
						>
							{theme === 'system' && <Sun className='h-5 w-5' />}
							{theme === 'light' && <Moon className='h-5 w-5' />}
							{theme === 'dark' && <SunMoon className='h-5 w-5' />}
							<span className='sr-only'>
								{theme === 'system' && 'Light'}
								{theme === 'light' && 'Dark'}
								{theme === 'dark' && 'System'}
							</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent side='right'>Theme</TooltipContent>
				</Tooltip>
			</nav>
			<nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href='/settings'
							className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
						>
							<Settings className='h-5 w-5' />
							<span className='sr-only'>Settings</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side='right'>Settings</TooltipContent>
				</Tooltip>
			</nav>
		</aside>
	)
}

export { SideNav }
