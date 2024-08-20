'use server'
import { connectDB } from '@/lib/mongodb'
import Book, { type BookOwnStatus, type BookReadingStatus } from '@/models/Book'
import { revalidateTag } from 'next/cache'

export const newBook = async (
	userId: string,
	title: string,
	author: string,
	genre: string,
	publisher?: string,
	ownStatus?: BookOwnStatus,
	readingStatus?: BookReadingStatus,
	description?: string
) => {
	try {
		await connectDB()
		await Book.create({ userId, title, author, genre, publisher, ownStatus, readingStatus, description })

		revalidateTag('books')
	} catch (error) {
		console.log(error)
	}
}
