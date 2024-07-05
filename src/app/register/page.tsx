'use client'
import { register } from '@/actions/register'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { z } from 'zod'
import { useSession } from 'next-auth/react'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { PasswordInput } from '../components/PasswordInput'

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

		const r = await register(email, password)
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
				{session.status === 'authenticated' && <p>Already logged in...</p>}
				{session.status === 'unauthenticated' && (
					<form
						ref={ref}
						action={handleSubmit}
						className='mx-auto min-w-96 flex flex-col gap-6'
					>
						<h3 className='text-center text-lg font-medium'>Register</h3>
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
						<div className='flex flex-col gap-2'>
							<Label htmlFor='password'>Confirm password*</Label>
							<PasswordInput name='password_confirm' />
						</div>
						<Button>Sign up</Button>
						<Link
							href='/login'
							className='text-center font-medium text-sm'
						>
							Already have an account?
						</Link>
					</form>
				)}
			</section>
		</>
	)
}
