'use server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'
import { revalidateTag } from 'next/cache'

export const newPost = async (
	text: string,
	author: string,
	images?: string[]
) => {
	try {
		await connectDB()
		await Post.create({ text, author, images })

		revalidateTag('posts')
	} catch (error) {
		console.log(error)
	}
}
