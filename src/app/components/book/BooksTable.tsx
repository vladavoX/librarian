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
							<TableHead className="hidden sm:table-cell">Genre</TableHead>
							<TableHead className="hidden sm:table-cell">Owned status</TableHead>
							<TableHead className="hidden md:table-cell">Reading status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{books.map((book) => (
							<TableRow key={book._id}>
								<TableCell>
									<div className="font-medium">{book.title}</div>
									<div className="hidden text-sm text-muted-foreground md:inline">{book.author}</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell">{book.genre}</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs" variant={ownStatusStyle(book.ownStatus)}>
										{book.ownStatus ? capitalize(book.ownStatus) : 'Not defined'}
									</Badge>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs" variant={readingStatusStyle(book.readingStatus)}>
										{book.readingStatus ? capitalize(book.readingStatus) : 'Not defined'}
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
