import type { PostDocument } from '@/models/Post'

export async function getPosts(
	page: number
): Promise<{ posts: PostDocument[]; postsCount: number }> {
	const res = await fetch(`http://localhost:3000/api/posts?page=${page}`, {
		next: { tags: ['posts'] }
	})

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}
