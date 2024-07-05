'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

const PasswordInput = ({ name = 'password' }: { name?: string | undefined }) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className='relative'>
			<Input
				type={showPassword ? 'text' : 'password'}
				className={cn('hide-password-toggle pr-10')}
				name={name}
				id={name}
				autoComplete='current-password'
				placeholder='Password'
				minLength={8}
			/>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
				onClick={() => setShowPassword(prev => !prev)}
			>
				{showPassword ? (
					<EyeIcon
						className='h-4 w-4'
						aria-hidden='true'
					/>
				) : (
					<EyeOffIcon
						className='h-4 w-4'
						aria-hidden='true'
					/>
				)}
				<span className='sr-only'>{showPassword ? 'Hide password' : 'Show password'}</span>
			</Button>
		</div>
	)
}

export { PasswordInput }
