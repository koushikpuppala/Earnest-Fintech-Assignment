'use client'

import Link from 'next/link'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { useAuth } from '@import/contexts'
import { useEffect, useState } from 'react'
import { TOAST_OPTIONS } from '@import/constants'
import { useSearchParams } from 'next/navigation'

const LoginForm = () => {
	const { login } = useAuth()
	const searchParams = useSearchParams()

	const verifyEmailSent = searchParams.get('verify-email-sent') === 'true'
	const emailVerified = searchParams.get('email-verified') === 'true'

	const [form, setForm] = useState({ email: '', password: '' })

	const [loading, setLoading] = useState(false)
	const [isDisabled, setIsDisabled] = useState(true)
	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		if (form.email && form.password) setIsDisabled(false)
		else setIsDisabled(true)
	}, [form])

	useEffect(() => {
		if (verifyEmailSent)
			toast.success(
				'Verification email sent successfully. Please check your email to verify your account.',
				TOAST_OPTIONS
			)

		if (emailVerified) toast.success('Email verified successfully', TOAST_OPTIONS)
	}, [verifyEmailSent, emailVerified])

	const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target

		setForm({ ...form, [name]: value })
	}

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		setLoading(true)

		try {
			await login(form.email, form.password)
		} catch (error) {
			setLoading(false)
		}
	}

	return (
		<form className='space-y-6'>
			<div>
				<div className='flex items-center justify-between'>
					<label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
						Email address <span className='text-red-500'>*</span>
					</label>
					<div className='text-sm'>
						<Link href='/verify' className='font-semibold text-accent hover:text-opacity-90'>
							Verify email
						</Link>
					</div>
				</div>
				<div className='mt-2'>
					<input
						id='email'
						name='email'
						type='email'
						value={form.email}
						onChange={handleChangeEvent}
						className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
					/>
				</div>
			</div>

			<div>
				<div className='flex items-center justify-between'>
					<label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
						Password <span className='text-red-500'>*</span>
					</label>
					{/* <div className='text-sm'>
						<Link href='/forgot' className='font-semibold text-accent hover:text-opacity-90'>
							Forgot password?
						</Link>
					</div> */}
				</div>
				<div className='mt-2'>
					<input
						id='password'
						name='password'
						type={showPassword ? 'text' : 'password'}
						value={form.password}
						onChange={handleChangeEvent}
						className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
					/>
				</div>
			</div>

			<div className='flex items-center justify-between'>
				<label htmlFor='show-password' className='block text-sm font-medium leading-6 text-gray-900'>
					Show Password
				</label>
				<div className='mt-2'>
					<input
						id='show-password'
						name='show-password'
						type='checkbox'
						checked={showPassword}
						onChange={() => setShowPassword(!showPassword)}
						className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6'
					/>
				</div>
			</div>

			<div>
				<button
					type='submit'
					onClick={(event) => handleSubmit(event)}
					disabled={isDisabled || loading}
					className={classNames(
						{
							'bg-primary/75': isDisabled || loading,
							'bg-primary hover:bg-tertiary': !isDisabled && !loading,
						},
						'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					)}>
					{loading ? 'Signing in...' : 'Sign in'}
				</button>
			</div>
		</form>
	)
}

export default LoginForm
