import { connectDB } from '@/lib/mongodb'
import Post, { type PostDocument } from '@/models/Post'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get('page') || '1', 10)
	const perPage = 8
	const skip = (page - 1) * perPage

	try {
		await connectDB()

		const posts = await Post.find<PostDocument>()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(perPage)
		const postsCount = await Post.countDocuments()

		return new Response(JSON.stringify({ posts, postsCount }), {
			status: 200
		})
	} catch (error) {
		console.log(error)
	}
}
