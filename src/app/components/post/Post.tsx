'use server'

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
	const date = new Date(post.createdAt)

	return (
		<div className="border-b border-accent py-8 flex gap-2">
			{/* <Avatar>
				<AvatarImage src={user?.avatar} />
				<AvatarFallback>FB</AvatarFallback>
			</Avatar> */}
			<div className="relative w-full">
				<div className="text-sm">
					{/* <p className='text-foreground font-medium'>
						{user?.firstName} {user?.lastName} <span className='text-muted-foreground'>@{user?.username}</span>
					</p> */}
					<p className="text-muted-foreground">{since(date)}</p>
				</div>
				<p className="text-foreground mt-4">{post.text}</p>
				{post.image && <Image src={post.image} fill alt={post.text} />}
				<PostActions user={user} post={post} />
			</div>
		</div>
	)
}

export { Post }
