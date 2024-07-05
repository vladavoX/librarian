'use client'
import { type FormEvent, useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { PasswordInput } from '../components/PasswordInput'

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

export default function Login() {
	const session = useSession()
	const router = useRouter()

	if (session.status === 'authenticated') router.push('/')

	const ref = useRef<HTMLFormElement>(null)
	const { toast } = useToast()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)

		// validate the form data
		const parsedFormData = loginSchema.safeParse({
			email: formData.get('email') as string,
			password: formData.get('password') as string
		})
		if (!parsedFormData.success) {
			toast({
				description: parsedFormData.error.errors[0].message,
				title: 'There was an error logging in',
				variant: 'destructive',
				duration: 3000
			})
			return
		}

		const res = await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirect: false
		})
		if (res?.error) {
			toast({
				description: res.error,
				title: 'There was an error logging in',
				variant: 'destructive',
				duration: 3000
			})
		}
		if (res?.ok) {
			toast({
				description: 'Logged in successfully',
				title: 'Success'
			})
			return router.push('/')
		}
	}

	return (
		<>
			<section className='w-full h-screen flex items-center justify-center'>
				{session.status === 'loading' && <LoadingSpinner />}
				{session.status === 'authenticated' && <p>Already logged in...</p>}
				{session.status === 'unauthenticated' && (
					<form
						ref={ref}
						onSubmit={handleSubmit}
						className='mx-auto min-w-96 flex flex-col gap-6'
					>
						<h3 className='text-center text-lg font-medium'>Sign in</h3>
						<div className='flex flex-col gap-2'>
							<Label
								htmlFor='email'
								className='flex justify-between'
							>
								Email*
							</Label>
							<Input
								name='email'
								type='email'
								required
								placeholder='john.smith@email.com'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<Label htmlFor='password'>Password*</Label>
							<PasswordInput />
						</div>

						<Button>Sign in</Button>

						<Link
							href='/register'
							className='text-center font-medium text-sm'
						>
							Don't have an account?
						</Link>
					</form>
				)}
			</section>
		</>
	)
}
