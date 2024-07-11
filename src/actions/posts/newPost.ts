'use server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'

export const newPost = async (text: string, author: string, image?: string) => {
	try {
		await connectDB()

		await Post.create({ text, author, image })
	} catch (error) {
		console.log(error)
	}
}
