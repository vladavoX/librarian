'use client'
import type { BooksFilterSearchParams } from '@/app/(withLayout)/my-books/page'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ListFilter, XIcon } from 'lucide-react'
import Link from 'next/link'

const BooksFilter = ({ ownStatus, readingStatus }: BooksFilterSearchParams) => {
	return (
		<div className="flex items-center">
			<div className="ml-auto flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
							<ListFilter className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only">Filter</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Filter by</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<Link href={'/my-books?ownStatus=owned'}>
							<DropdownMenuCheckboxItem checked={ownStatus === 'owned'}>Owned</DropdownMenuCheckboxItem>
						</Link>
						<Link href={'/my-books?ownStatus=not_owned'}>
							<DropdownMenuCheckboxItem checked={ownStatus === 'not_owned'}>Not owned</DropdownMenuCheckboxItem>
						</Link>
						<DropdownMenuSeparator />
						<Link href={'/my-books?readingStatus=read'}>
							<DropdownMenuCheckboxItem checked={readingStatus === 'read'}>Read</DropdownMenuCheckboxItem>
						</Link>
						<Link href={'/my-books?readingStatus=not_read'}>
							<DropdownMenuCheckboxItem checked={readingStatus === 'not_read'}>Didn't read</DropdownMenuCheckboxItem>
						</Link>
						<Link href={'/my-books?readingStatus=paused'}>
							<DropdownMenuCheckboxItem checked={readingStatus === 'paused'}>Paused</DropdownMenuCheckboxItem>
						</Link>
						<Link href={'/my-books?readingStatus=reading'}>
							<DropdownMenuCheckboxItem checked={readingStatus === 'reading'}>Reading</DropdownMenuCheckboxItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
				<Link
					href={'/my-books'}
					className={cn(!ownStatus && !readingStatus ? 'pointer-events-none' : '')}
					aria-disabled={!ownStatus && !readingStatus}
				>
					<Button size="sm" className="h-7 text-sm" variant="outline" disabled={!ownStatus && !readingStatus}>
						<XIcon className="h-3.5 w-3.5" />
					</Button>
				</Link>
			</div>
		</div>
	)
}

export { BooksFilter }
