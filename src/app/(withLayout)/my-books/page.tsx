import { BooksFilter, BooksHeader, BooksTable } from '@/app/components/book'
import { getBooks, getUser } from '@/app/fetch'
import { getServerSession } from 'next-auth'

export type BooksFilterSearchParams = {
	ownStatus: string | undefined
	readingStatus: string | undefined
}

export default async function MyBooks({ searchParams }: { searchParams: BooksFilterSearchParams }) {
	const session = await getServerSession()
	const user = await getUser(session?.user?.email || '')
	const books = await getBooks(user?._id)

	const filteredBooks = books.filter((book) => {
		const ownStatus = !searchParams.ownStatus || book.ownStatus?.toLowerCase() === searchParams.ownStatus
		const readingStatus =
			!searchParams.readingStatus || book.readingStatus?.toLowerCase() === searchParams.readingStatus

		return ownStatus && readingStatus
	})

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
			<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
				<BooksHeader />
				<BooksFilter ownStatus={searchParams.ownStatus} readingStatus={searchParams.readingStatus} />
				<BooksTable books={filteredBooks} />
			</div>
			<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">something else</div>
		</main>
	)
}
