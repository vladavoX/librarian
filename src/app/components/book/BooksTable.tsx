import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { BookOwnStatus, BookReadingStatus, type BookDocument } from '@/models/Book'
import { capitalize } from '@/utils/utils'

const BooksTable = ({ books }: { books: BookDocument[] }) => {
	const ownStatusStyle = (status: BookOwnStatus | undefined) => {
		switch (status) {
			case BookOwnStatus.OWNED:
				return 'default'
			case BookOwnStatus.NOT_OWNED:
				return 'secondary'
			default:
				return 'outline'
		}
	}

	const formatOwnStatus = (status: BookOwnStatus | undefined) => {
		switch (status) {
			case BookOwnStatus.OWNED:
				return 'Yes'
			case BookOwnStatus.NOT_OWNED:
				return 'No'
			default:
				return 'Not defined'
		}
	}

	const formatReadingStatus = (status: BookReadingStatus | undefined) => {
		switch (status) {
			case BookReadingStatus.READ:
				return 'Yes'
			case BookReadingStatus.READING:
				return 'Reading'
			case BookReadingStatus.PAUSED:
				return 'Paused'
			case BookReadingStatus.NOT_READ:
				return 'No'
			default:
				return 'Not defined'
		}
	}

	const readingStatusStyle = (status: BookReadingStatus | undefined) => {
		switch (status) {
			case BookReadingStatus.READ:
				return 'default'
			case BookReadingStatus.READING:
				return 'secondary'
			case BookReadingStatus.PAUSED:
				return 'outline'
			default:
				return 'destructive'
		}
	}

	return (
		<Card x-chunk="dashboard-05-chunk-3">
			<CardHeader className="px-7">
				<CardTitle>Books</CardTitle>
				<CardDescription>List of all your books.</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Book</TableHead>
							<TableHead className="md:hidden whitespace-nowrap">Author</TableHead>
							<TableHead className="hidden md:table-cell whitespace-nowrap">Genre</TableHead>
							<TableHead className="hidden md:table-cell text-right whitespace-nowrap">Owned</TableHead>
							<TableHead className="hidden sm:table-cell text-right whitespace-nowrap">Read</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{books.map((book) => (
							<TableRow key={book._id}>
								<TableCell>
									<div className="font-medium whitespace-nowrap">{book.title}</div>
									<div className="hidden text-sm text-muted-foreground md:inline">{book.author}</div>
								</TableCell>
								<TableCell className="md:hidden whitespace-nowrap">{book.author}</TableCell>
								<TableCell className="hidden md:table-cell">{book.genre}</TableCell>
								<TableCell className="hidden md:table-cell text-right whitespace-nowrap">
									<Badge className="text-xs" variant={ownStatusStyle(book.ownStatus)}>
										{formatOwnStatus(book.ownStatus)}
									</Badge>
								</TableCell>
								<TableCell className="hidden sm:table-cell text-right whitespace-nowrap">
									<Badge className="text-xs" variant={readingStatusStyle(book.readingStatus)}>
										{formatReadingStatus(book.readingStatus)}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

export { BooksTable }
