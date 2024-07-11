'use server'

import { addLikeDislike } from '@/actions/posts/updatePost'
import { getUser } from '@/actions/users'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import type { PostDocument } from '@/models/Post'
import { since } from '@/utils/formatDate'
import { Heart, MessageSquare, ThumbsDown } from 'lucide-react'
import Image from 'next/image'
import { PostActions } from './PostActions'

const Post = async ({ post }: { post: PostDocument }) => {
	const user = await getUser(post.author)
	const date = new Date(post.createdAt)

	return (
		<div className="border-b border-accent py-8 flex gap-2">
			<Avatar>
				<AvatarImage src={user?.avatar} />
				<AvatarFallback>FB</AvatarFallback>
			</Avatar>
			<div className="relative w-full">
				<div className="text-sm">
					<p className="text-foreground font-medium">
						{user?.firstName} {user?.lastName}{' '}
						<span className="text-muted-foreground">@{user?.username}</span>
					</p>
					<p className="text-muted-foreground">{since(date)}</p>
				</div>
				<p className="text-foreground mt-4">{post.text}</p>
				{post.image && <Image src={post.image} fill alt={post.text} />}
				<PostActions post={post} />
			</div>
		</div>
	)
}

export { Post }
