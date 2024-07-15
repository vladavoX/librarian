'use server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'
import { revalidatePath } from 'next/cache'

export const handlePostLikes = async (id: string, postLiked?: boolean) => {
	try {
		await connectDB()
		if (postLiked) await Post.updateOne({ _id: id }, { $inc: { likes: -1 } })
		if (!postLiked) await Post.updateOne({ _id: id }, { $inc: { likes: 1 } })

		revalidatePath('/(withLayout)/')
	} catch (error) {
		console.log(error)
	}
}
