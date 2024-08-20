'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { newBook } from '@/actions/books/newBooks'
import { getUser } from '@/app/fetch'
import { useToast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const NewBookForm = () => {
	const session = useSession()
	const { toast } = useToast()
	const router = useRouter()

	const handleSubmit = async (formData: FormData) => {
		const user = await getUser(session?.data?.user?.email || '')

		if (session?.data?.user?.email) {
			const title = formData.get('title') as string
			const author = formData.get('author') as string
			const genre = formData.get('genre') as string
			const publisher = formData.get('publisher') as string
			const ownStatus = formData.get('ownStatus') as BookOwnStatus
			const readingStatus = formData.get('readingStatus') as BookReadingStatus
			const description = formData.get('description') as string
			await newBook(user._id, title, author, genre, publisher, ownStatus, readingStatus, description)

			toast({
				title: 'Success',
				description: 'Book added successfully'
			})

			router.push('/my-books')
		}
	}

	return (
		<form className="flex flex-col gap-4" action={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Add new book</CardTitle>
					<CardDescription>Add new book to your collection</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="title">Title *</Label>
							<Input id="title" name="title" type="text" placeholder="Philosopher's Stone" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="author">Author *</Label>
							<Input id="author" name="author" type="text" placeholder="J. K. Rowling" required />
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
							<Select name="ownStatus">
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
							<Select name="readingStatus">
								<SelectTrigger>
									<SelectValue placeholder="Select an option" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Select an option</SelectLabel>
										<SelectItem value={BookReadingStatus.READ}>Yes</SelectItem>
										<SelectItem value={BookReadingStatus.NOT_READ}>No</SelectItem>
										<SelectItem value={BookReadingStatus.READING}>Reading</SelectItem>
										<SelectItem value={BookReadingStatus.PAUSED}>Paused</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2 col-span-3">
							<Label htmlFor="description">Description</Label>
							<Textarea id="description" name="description" placeholder="Leave a description of the book" />
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
