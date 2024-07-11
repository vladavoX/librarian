'use client'

import { newPost } from '@/actions/posts/newPost'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const NewPostForm = () => {
	const [characters, setCharacters] = useState(0)
	const session = useSession()

	const handleSubmit = async (formData: FormData) => {
		if (session.data?.user?.email) {
			const text = formData.get('text') as string
			await newPost(text, session.data?.user?.email, undefined)
		}
	}

	return (
		<form
			className='flex flex-col gap-4 border-b border-accent pb-4'
			action={handleSubmit}
		>
			<div className='flex flex-col gap-2'>
				<Label>New post</Label>
				<Textarea
					name='text'
					className='resize-none'
					placeholder='Write something...'
					maxLength={300}
					rows={5}
					autoComplete='off'
					required
					onChange={e => setCharacters(e.target.value.length)}
				/>
				<div className='flex justify-between text-muted-foreground text-sm'>
					<p>
						You can <span>@mention</span> other users and organizations.
					</p>
					<p>{characters}/300</p>
				</div>
			</div>
			<Button
				className='max-w-fit ml-auto'
				disabled={session.status !== 'authenticated' || characters > 300}
			>
				Post
			</Button>
		</form>
	)
}

export { NewPostForm }
