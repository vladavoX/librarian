'use server'
import { connectDB } from '@/lib/mongodb'
import User, { type UserDocument } from '@/models/User'
import { revalidateTag } from 'next/cache'

export const updateUserTheme = async (email: string, theme: string) => {
	try {
		await connectDB()
		await User.updateOne({ email }, { $set: { 'settings.theme': theme } })

		revalidateTag('users')
	} catch (error) {
		console.log(error)
	}
}

export const updateUserLikes = async (email: string, id: string) => {
	try {
		await connectDB()

		// find if the user has already liked or disliked the post
		const user = await User.findOne<UserDocument>({ email })

		if (!user) return

		const alreadyLiked = user?.likes?.includes(id)

		// if the user has already liked the post
		if (alreadyLiked) await User.updateOne({ email }, { $pull: { likes: id } })

		// if the user has not liked the post
		if (!alreadyLiked)
			await User.updateOne({ email }, { $addToSet: { likes: id } })

		revalidateTag('users')
	} catch (error) {
		console.log(error)
	}
}
