'use client'

import { handlePostLikes } from '@/actions/posts/updatePost'
import { updateUserLikes } from '@/actions/users'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import type { PostDocument } from '@/models/Post'
import type { UserDocument } from '@/models/User'
import { Heart, MessageSquare } from 'lucide-react'
import { useOptimistic, useState } from 'react'

const PostActions = ({
	user,
	post
}: { user: UserDocument | undefined; post: PostDocument }) => {
	const [postLiked, setPostLiked] = useState(user?.likes?.includes(post._id))
	const [postCommented, setPostCommented] = useState(
		user?.comments?.includes({ _id: post._id })
	)
	const [optimisticLikes, addOptimisticLikes] = useOptimistic(post.likes)
	return (
		<div className="flex items-center justify-between mt-4 text-muted-foreground rounded-md text-xs">
			<div className="flex items-center gap-1 -ml-2.5">
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full group"
					onClick={async () => {
						if (!user)
							return toast({
								title: 'Not logged in',
								description: 'Please login to interact with posts',
								variant: 'destructive'
							})

						addOptimisticLikes(
							postLiked ? optimisticLikes - 1 : optimisticLikes + 1
						)
						setPostLiked(!postLiked)

						await handlePostLikes(post._id, postLiked)
						await updateUserLikes(user.email, post._id)
					}}
				>
					<Heart
						className={cn(
							'h-5 w-5 transition-transform group-hover:scale-110',
							postLiked && 'text-red-500'
						)}
						fill={postLiked ? '#f43f5e' : 'none'}
					/>
				</Button>
				<span className={cn(postLiked && 'text-red-500')}>
					{optimisticLikes}
				</span>
				<Button
					size="icon"
					variant="ghost"
					type="button"
					className="rounded-full group"
				>
					<MessageSquare
						className={cn(
							'h-5 w-5 transition-transform group-hover:scale-110',
							postCommented && 'text-blue-500'
						)}
						fill={postCommented ? '#3b82f6' : 'none'}
					/>
				</Button>
				<span className={cn(postCommented && 'text-blue-500')}>
					{post.comments.length}
				</span>
			</div>
		</div>
	)
}

export { PostActions }
