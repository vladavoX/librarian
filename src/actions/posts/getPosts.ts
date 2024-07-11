'use server'
import { connectDB } from '@/lib/mongodb'
import Post, { type PostDocument } from '@/models/Post'

export async function getPosts(): Promise<PostDocument[] | undefined> {
	try {
		await connectDB()

		const response = await Post.find<PostDocument>({}).sort({ createdAt: -1 })
		const posts = JSON.parse(JSON.stringify(response))
		return posts
	} catch (error) {
		console.log(error)
	}
}
