'use server'
import { Post } from '../components/post/Post'
import { NewPostForm } from '../components/form/NewPostForm'
import type { PostDocument } from '@/models/Post'
import { revalidatePath } from 'next/cache'

async function getData(
	page: number
): Promise<{ posts: PostDocument[]; postsCount: number }> {
	const res = await fetch(`http://localhost:3000/api/posts?page=${page}`)

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	revalidatePath('/(withLayout)/')

	return res.json()
}

export default async function Home({
	searchParams
}: { searchParams: { page: string } }) {
	const page = Number(searchParams.page || '1')
	const data = await getData(page)

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
			<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
				something else
			</div>
			<div className="grid auto-rows-max items-start lg:col-span-2">
				<NewPostForm />
				{data.posts.map((post) => (
					<Post key={post._id} post={post} />
				))}
			</div>
			<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
				something else
			</div>
		</main>
	)
}
