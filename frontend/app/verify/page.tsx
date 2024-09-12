import { Logo } from '@import/assets'
import { VerifyForm } from '@import/components'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Verify Email' }

const VerifyPage = () => {
	return (
		<div className='flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<Link href='/'>
					<Image
						alt='Your Company'
						src={Logo}
						width={512}
						height={512}
						priority={false}
						className='mx-auto h-32 w-auto'
					/>
				</Link>
				<h2 className='mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Verify your email
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<VerifyForm />
				<p className='mt-5 text-center text-sm text-gray-500'>
					Already have an account?{' '}
					<Link href='/login' className='font-semibold leading-6 text-accent hover:text-opacity-90'>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	)
}

export default VerifyPage
