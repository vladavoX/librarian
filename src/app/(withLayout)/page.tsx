'use server'
import { NewPostForm } from '../components/form/NewPostForm'
import { Post } from '../components/post/Post'
import { getPosts } from '@/app/fetch'

export default async function Home({
	searchParams
}: { searchParams: { page: string } }) {
	const page = Number(searchParams.page || '1')
	const data = await getPosts(page)

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4">
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
