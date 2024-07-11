'use server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'
import { revalidatePath } from 'next/cache'

export const newPost = async (text: string, author: string, image?: string) => {
	try {
		await connectDB()

		await Post.create({ text, author, image })

		revalidatePath('/(withLayout)/')
	} catch (error) {
		console.log(error)
	}
}
