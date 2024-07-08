'use client'
import { type FormEvent, useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { LoadingSpinner } from '../components/loading/LoadingSpinner'
import { PasswordInput } from '../components/input/PasswordInput'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

export default function Login() {
	const session = useSession()
	const router = useRouter()
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

	if (session.status === 'authenticated') router.push('/')

	return (
		<>
			<section className='w-full h-screen flex items-center justify-center'>
				{session.status === 'loading' && <LoadingSpinner />}
				{session.status === 'authenticated' && <p>Redirecting...</p>}
				{session.status === 'unauthenticated' && (
					<form
						ref={ref}
						onSubmit={handleSubmit}
					>
						<Card className='mx-auto max-w-sm'>
							<CardHeader>
								<CardTitle className='text-2xl'>Login</CardTitle>
								<CardDescription>Enter your email below to login to your account</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='grid gap-4'>
									<div className='grid gap-2'>
										<Label htmlFor='email'>Email</Label>
										<Input
											id='email'
											name='email'
											type='email'
											placeholder='m@example.com'
											required
											autoComplete='email'
										/>
									</div>
									<div className='grid gap-2'>
										<div className='flex items-center'>
											<Label htmlFor='password'>Password</Label>
											<Link
												href='#'
												className='ml-auto inline-block text-sm underline'
											>
												Forgot your password?
											</Link>
										</div>
										<PasswordInput />
									</div>
									<Button
										type='submit'
										className='w-full'
									>
										Login
									</Button>
								</div>
								<div className='mt-4 text-center text-sm'>
									Don&apos;t have an account?{' '}
									<Link
										href='/register'
										className='underline'
									>
										Sign up
									</Link>
								</div>
							</CardContent>
						</Card>
					</form>
				)}
			</section>
		</>
	)
}
