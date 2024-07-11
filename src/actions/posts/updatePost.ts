'use server'
import { connectDB } from '@/lib/mongodb'
import Post, { type PostDocument } from '@/models/Post'
import { revalidatePath } from 'next/cache'

export const addLikeDislike = async (
	id: string,
	type: 'likes' | 'dislikes'
) => {
	try {
		await connectDB()
		await Post.findByIdAndUpdate(id, {
			$inc: {
				[type]: 1
			}
		})

		revalidatePath('/(withLayout)/')
	} catch (error) {
		console.log(error)
	}
}
