import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { BookOwnStatus, BookReadingStatus } from '@/models/Book'
import { NotesQuotes } from './bookForm/NotesQuotes'

const NewBookForm = () => {
	return (
		<form className="flex flex-col gap-4">
			<Card>
				<CardHeader>
					<CardTitle>Add new book</CardTitle>
					<CardDescription>Add new book to your collection</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="title">Title *</Label>
							<Input
								id="title"
								name="title"
								type="text"
								placeholder="Philosopher's Stone"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="author">Author *</Label>
							<Input
								id="author"
								name="author"
								type="text"
								placeholder="J. K. Rowling"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="genre">Genre *</Label>
							<Input
								id="genre"
								name="genre"
								type="text"
								placeholder="Novel, Children's literature, Fantasy Fiction, High fantasy"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="publisher">Publisher</Label>
							<Input id="publisher" name="publisher" type="text" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="ownStatus">Do you own the book?</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select an option" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Select an option</SelectLabel>
										<SelectItem value={BookOwnStatus.OWNED}>Yes</SelectItem>
										<SelectItem value={BookOwnStatus.NOT_OWNED}>No</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="readingStatus">Did you read the book?</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select an option" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Select an option</SelectLabel>
										<SelectItem value={BookReadingStatus.READ}>Read</SelectItem>
										<SelectItem value={BookReadingStatus.NOT_READ}>
											Not read
										</SelectItem>
										<SelectItem value={BookReadingStatus.READING}>
											Reading
										</SelectItem>
										<SelectItem value={BookReadingStatus.PAUSED}>
											Paused
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2 col-span-3">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								name="description"
								placeholder="Leave a description of the book"
							/>
						</div>
						<NotesQuotes />
					</div>
				</CardContent>
			</Card>
			<Button type="submit" className="ml-auto w-fit">
				Submit
			</Button>
		</form>
	)
}

export { NewBookForm }
