'use client'

import classNames from 'classnames'
import { useAuth } from '@import/contexts'
import { useEffect, useState } from 'react'

const RegisterForm = () => {
	const { register } = useAuth()

	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const [isDisabled, setIsDisabled] = useState(true)
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		if (form.name && form.email && form.password && form.confirmPassword) setIsDisabled(false)
		else setIsDisabled(true)
	}, [form])

	const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target

		setForm({ ...form, [name]: value })
	}

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		setLoading(true)

		try {
			await register(form.name, form.email, form.password)
		} catch (error) {
			setLoading(false)
		}
	}

	return (
		<form className='space-y-6'>
			<div>
				<label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>
					Full name <span className='text-red-500'>*</span>
				</label>
				<div className='mt-2'>
					<input
						id='name'
						name='name'
						type='text'
						value={form.name}
						onChange={handleChangeEvent}
						className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
					/>
				</div>
			</div>

			<div>
				<label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
					Email address <span className='text-red-500'>*</span>
				</label>
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

			<div>
				<div className='flex items-center justify-between'>
					<label htmlFor='confirmPassword' className='block text-sm font-medium leading-6 text-gray-900'>
						Confirm password <span className='text-red-500'>*</span>
					</label>
				</div>
				<div className='mt-2'>
					<input
						id='confirmPassword'
						name='confirmPassword'
						type={showPassword ? 'text' : 'password'}
						value={form.confirmPassword}
						onChange={handleChangeEvent}
						className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
					/>
				</div>
				{form.password && form.confirmPassword && form.password !== form.confirmPassword && (
					<p className='px-4 text-xs leading-6 text-red-500'>Passwords do not match</p>
				)}
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
						{ 'bg-primary/75': isDisabled, 'bg-primary hover:bg-tertiary': !isDisabled },
						'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					)}>
					{loading ? 'Signing up...' : 'Sign up'}
				</button>
			</div>
		</form>
	)
}

export default RegisterForm
