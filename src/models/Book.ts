import mongoose, { Schema, model } from 'mongoose'

export interface BookDocument {
	_id: string
	title: string
	author: string
	genre: string
	publisher: string
	description: string
	cover: string
	ownStatus: BookOwnStatus
	readingStatus: BookReadingStatus
	interested: boolean
	notes: string[]
	quotes: string[]
	createdAt: Date
	updatedAt: Date
	userId: string
}

export enum BookOwnStatus {
	OWNED = 'OWNED',
	NOT_OWNED = 'NOT_OWNED'
}

export enum BookReadingStatus {
	READ = 'READ',
	READING = 'READING',
	NOT_READ = 'NOT_READ',
	PAUSED = 'PAUSED'
}

const BookSchema = new Schema<BookDocument>(
	{
		title: { type: String, required: [true, 'Title is required'] },
		author: { type: String, required: [true, 'Author is required'] },
		genre: { type: String, required: [true, 'Genre is required'] },
		publisher: { type: String },
		description: { type: String },
		cover: { type: String },
		ownStatus: {
			type: String,
			enum: Object.values(BookOwnStatus),
			default: BookOwnStatus.NOT_OWNED
		},
		readingStatus: {
			type: String,
			enum: Object.values(BookReadingStatus),
			default: BookReadingStatus.NOT_READ
		},
		interested: { type: Boolean, default: false },
		notes: { type: [String], default: [] },
		quotes: { type: [String], default: [] },
		userId: { type: String, required: true }
	},
	{
		timestamps: true,
		autoIndex: true
	}
)

const Book = mongoose.models?.Book || model<BookDocument>('Book', BookSchema)
export default Book
