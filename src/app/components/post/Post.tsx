'use server'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { PostDocument } from '@/models/Post'
import type { UserDocument } from '@/models/User'
import { since } from '@/utils/formatDate'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { PostActions } from './PostActions'

async function getUser(email: string): Promise<UserDocument> {
	const res = await fetch(`http://localhost:3000/api/users?email=${email}`)

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

const Post = async ({ post }: { post: PostDocument }) => {
	const session = await getServerSession()
	const user = await getUser(session?.user?.email || '')
	const author = await getUser(post.author)
	const date = new Date(post.createdAt)

	const avatarFallback = () => {
		if (author?.firstName && author?.lastName)
			return author.firstName[0] + author.lastName[0]
		return author?.username[0] + author?.username[1]
	}

	return (
		<div className="border-b border-accent py-8 flex gap-2 flex-col">
			<Avatar>
				<AvatarImage src={author?.avatar} />
				<AvatarFallback>{avatarFallback()}</AvatarFallback>
			</Avatar>
			<div className="relative w-full">
				<div className="text-sm">
					<p className="text-foreground font-medium">
						{author?.firstName} {author?.lastName}{' '}
						<span className="text-muted-foreground">@{author?.username}</span>
					</p>
					<p className="text-muted-foreground">{since(date)}</p>
				</div>
				<p className="text-foreground mt-4">{post.text}</p>
			</div>
			{post.images && post.images.length > 0 && (
				<div className="relative h-[600px] overflow-hidden">
					{post.images?.map((image) => (
						<Image
							key={image}
							src={image}
							alt={post.text}
							sizes="(100vw - 2rem) 400px"
							fill
							className="object-cover rounded-lg border border-muted-foreground"
						/>
					))}
				</div>
			)}
			<PostActions user={user} post={post} />
		</div>
	)
}

export { Post }
