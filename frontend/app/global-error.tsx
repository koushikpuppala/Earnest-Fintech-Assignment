'use client'

import { GlobalErrorProps } from '@import/types'

const GlobalError = ({ reset }: GlobalErrorProps) => {
	return (
		<div className='flex h-screen w-full flex-col place-items-center items-center justify-center gap-6 bg-white text-center'>
			<p className='text-9xl font-black text-indigo-600'>500</p>
			<div className='flex flex-col gap-2'>
				<h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl'>Internal Server Error</h1>
				<p className='text-base leading-7 text-gray-600'>Something went wrong!</p>
			</div>
			<button
				onClick={() => reset()}
				className='group flex flex-row items-center gap-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
				Reload the page
			</button>
		</div>
	)
}

export default GlobalError
