import type { BookDocument } from '@/models/Book'

export async function getBooks(userId: string): Promise<BookDocument[]> {
	const res = await fetch(`http://localhost:3000/api/books?userId=${userId}`, {
		next: { tags: ['books'] }
	})

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}
