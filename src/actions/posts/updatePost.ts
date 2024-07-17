'use server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'
import { revalidateTag } from 'next/cache'

export const handlePostLikes = async (id: string, postLiked?: boolean) => {
	try {
		await connectDB()
		if (postLiked) await Post.updateOne({ _id: id }, { $inc: { likes: -1 } })
		if (!postLiked) await Post.updateOne({ _id: id }, { $inc: { likes: 1 } })

		revalidateTag('posts')
	} catch (error) {
		console.log(error)
	}
}
