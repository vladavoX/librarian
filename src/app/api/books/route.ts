import { connectDB } from '@/lib/mongodb'
import Book, { type BookDocument } from '@/models/Book'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const userId = searchParams.get('userId')

	try {
		await connectDB()
		const books = await Book.find<BookDocument>({ userId }).sort({
			createdAt: -1
		})
		return new Response(JSON.stringify(books), {
			status: 200
		})
	} catch (error) {
		console.log(error)
	}
}
