'use client'
import { register } from '@/actions/register'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { z } from 'zod'
import { LoadingSpinner } from '../components/loading/LoadingSpinner'
import { PasswordInput } from '../components/input/PasswordInput'

const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	password_confirm: z.string().min(8)
})

export default function Register() {
	const session = useSession()
	const router = useRouter()

	if (session.status === 'authenticated') router.push('/')

	const ref = useRef<HTMLFormElement>(null)
	const { toast } = useToast()

	const handleSubmit = async (formData: FormData) => {
		const firstName = formData.get('first-name') as string
		const lastName = formData.get('last-name') as string
		const username = formData.get('username') as string
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const password_confirm = formData.get('password_confirm') as string

		if (password !== password_confirm) {
			toast({
				description: 'Passwords do not match',
				title: 'There was an error registering',
				variant: 'destructive',
				duration: 3000
			})
			return
		}

		// validate the form data
		const parsedFormData = registerSchema.safeParse({
			email,
			password,
			password_confirm
		})
		if (!parsedFormData.success) {
			toast({
				description: parsedFormData.error.errors[0].message,
				title: 'There was an error registering',
				variant: 'destructive',
				duration: 3000
			})
			return
		}

		const r = await register(email, password, firstName, lastName, username)
		if (r?.error) {
			toast({
				description: r.error,
				title: 'There was an error registering',
				variant: 'destructive',
				duration: 3000
			})
			return
		}

		toast({
			description: 'Registered successfully',
			title: 'Success'
		})
		return router.push('/login')
	}

	return (
		<>
			<section className='w-full h-screen flex items-center justify-center'>
				{session.status === 'loading' && <LoadingSpinner />}
				{session.status === 'authenticated' && <p>Redirecting...</p>}
				{session.status === 'unauthenticated' && (
					<form
						ref={ref}
						action={handleSubmit}
					>
						<Card className='mx-auto max-w-sm'>
							<CardHeader>
								<CardTitle className='text-xl'>Sign Up</CardTitle>
								<CardDescription>Enter your information to create an account</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='grid gap-4'>
									<div className='grid grid-cols-2 gap-4'>
										<div className='grid gap-2'>
											<Label htmlFor='first-name'>First name</Label>
											<Input
												name='first-name'
												id='first-name'
												placeholder='Max'
											/>
										</div>
										<div className='grid gap-2'>
											<Label htmlFor='last-name'>Last name</Label>
											<Input
												name='last-name'
												id='last-name'
												placeholder='Robinson'
											/>
										</div>
									</div>
									<div className='grid gap-2'>
										<Label htmlFor='email'>Username</Label>
										<Input
											autoComplete='username'
											name='username'
											id='username'
											type='text'
											placeholder='example'
										/>
									</div>
									<div className='grid gap-2'>
										<Label htmlFor='email'>Email*</Label>
										<Input
											autoComplete='email'
											name='email'
											id='email'
											type='email'
											placeholder='m@example.com'
											required
										/>
									</div>
									<div className='grid gap-2'>
										<Label htmlFor='password'>Password*</Label>
										<PasswordInput />
									</div>
									<div className='grid gap-2'>
										<Label htmlFor='password_confirm'>Confirm password*</Label>
										<PasswordInput name='password_confirm' />
									</div>
									<Button
										type='submit'
										className='w-full'
									>
										Create an account
									</Button>
								</div>
								<div className='mt-4 text-center text-sm'>
									Already have an account?{' '}
									<Link
										href='/login'
										className='underline'
									>
										Sign in
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
