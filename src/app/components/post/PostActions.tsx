'use client'

import { addLikeDislike } from '@/actions/posts/updatePost'
import { Button } from '@/components/ui/button'
import type { PostDocument } from '@/models/Post'
import { Heart, ThumbsDown, MessageSquare } from 'lucide-react'
import React from 'react'

const PostActions = ({ post }: { post: PostDocument }) => {
	return (
		<div className="flex items-center justify-between mt-4 text-muted-foreground rounded-md text-xs">
			<div className="flex items-center gap-1 -ml-2.5">
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full"
					onClick={async () => await addLikeDislike(post._id, 'likes')}
				>
					<Heart className="h-5 w-5" />
				</Button>
				<span>{post.likes}</span>
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full"
					onClick={async () => await addLikeDislike(post._id, 'dislikes')}
				>
					<ThumbsDown className="h-5 w-5" />
				</Button>
				<span>{post.dislikes}</span>
				<Button
					size="icon"
					variant="ghost"
					type="button"
					className="rounded-full"
				>
					<MessageSquare className="h-5 w-5" />
				</Button>
				{post.comments.length}
			</div>
		</div>
	)
}

export { PostActions }
