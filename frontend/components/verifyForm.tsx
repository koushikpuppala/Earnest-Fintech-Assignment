'use client'

import { useSearchParams } from 'next/navigation'
import classNames from 'classnames'
import { useAuth } from '@import/contexts'
import { useEffect, useState } from 'react'
import Loading from './loading'

const VerifyForm = () => {
	const { verifyEmail, emailVerification } = useAuth()
	const searchParams = useSearchParams()

	const token = searchParams.get('token')

	const [form, setForm] = useState({ email: '' })

	const [isDisabled, setIsDisabled] = useState(true)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (token) {
			setLoading(true)

			const emailVerificationFunction = async () => {
				try {
					await emailVerification(token)
				} finally {
					setLoading(false)
				}
			}

			emailVerificationFunction()
		}
	}, [token, emailVerification])

	useEffect(() => {
		if (form.email) setIsDisabled(false)
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
			await verifyEmail(form.email)
		} finally {
			setLoading(false)
		}
	}

	if (token && loading) return <Loading />

	return (
		<form className='space-y-6'>
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
					{loading ? 'Sending email...' : 'Send verification email'}
				</button>
			</div>
		</form>
	)
}

export default VerifyForm
