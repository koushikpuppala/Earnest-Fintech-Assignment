'use client'

import { HiXMark } from 'react-icons/hi2'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FiLogOut } from 'react-icons/fi'
import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { useAuth } from '@import/contexts'
import { Logo } from '@import/assets'
import { User } from '@import/types'

const Links = [
	{ label: 'All Tasks', value: '' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'In Progress', value: 'in-progress' },
	{ label: 'Completed', value: 'completed' },
	{ label: 'Overdue', value: 'overdue' },
]

const SidebarContent = ({ user, setOpen }: { user: User; setOpen?: (open: boolean) => void }) => {
	const searchParams = useSearchParams()
	const status = searchParams.get('status') || ''
	const [signOutLoading, setSignOutLoading] = useState(false)

	const { logout } = useAuth()

	return (
		<div className='flex h-screen min-w-max flex-col items-center justify-between border-e bg-white px-4 py-2 align-middle shadow-lg'>
			<div className='flex flex-col gap-8 px-2 py-4 sm:py-6'>
				<div className='flex w-full items-center justify-center'>
					<Image src={Logo} className='h-auto w-24 sm:w-28' alt='logo' />
				</div>
				<div className='flex items-center justify-evenly gap-2 rounded-lg bg-blue-100 p-2 sm:px-4'>
					{/* <Image
						alt=''
						width={48}
						height={48}
						src={user?.avatar!}
						className='size-10 rounded-full object-cover sm:size-12'
					/> */}

					<span className='flex items-center justify-center size-10 text-2xl font-semibold text-white bg-accent rounded-full'>
						{user?.name?.charAt(0).toUpperCase()}
					</span>

					<div>
						<p className='gap-1 text-xs'>
							<strong className='block font-medium capitalize'>{user?.name}</strong>
							<span> {user?.email} </span>
						</p>
					</div>
				</div>
				<div className='flex flex-col gap-2'>
					{Links.map(({ label, value }) => (
						<Link
							key={value}
							href={`?${new URLSearchParams(value !== '' ? { status: value } : {}).toString()}`}
							onClick={() => setOpen?.(false)}
							className={classNames(
								'flex flex-row items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700',
								{
									'bg-gray-100 text-gray-700': status === value,
									'text-gray-500': status !== value,
								}
							)}>
							{label}
						</Link>
					))}
				</div>
			</div>
			<div className='sticky inset-x-0 bottom-0 w-full cursor-pointer rounded px-2'>
				<button
					onClick={() => {
						try {
							setSignOutLoading(true)
							logout()
						} catch (error) {
							console.error(error)
							setSignOutLoading(false)
						}
					}}
					className='flex w-full flex-row items-center justify-center gap-2 rounded px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
					<FiLogOut className='h-5 w-5 rotate-180' />
					Sign Out
					<SignOutLoading open={signOutLoading} />
				</button>
			</div>
		</div>
	)
}

const Sidebar = ({ user }: { user: User }) => {
	const [open, setOpen] = useState(false)

	return (
		<nav>
			<div className='hidden lg:flex'>
				<SidebarContent user={user} />
			</div>
			<div className='flex py-6 lg:hidden'>
				<div
					className='bg-accent fixed flex h-16 w-2 items-center justify-center rounded-md rounded-br-2xl rounded-tr-2xl py-6 text-lg font-semibold text-white opacity-50 lg:hidden'
					onClick={() => setOpen(!open)}
				/>

				<Transition show={open} as={Fragment}>
					<Dialog as='div' className='relative z-10 flex lg:hidden' onClose={setOpen}>
						<TransitionChild
							as={Fragment}
							enter='ease-in-out duration-500'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in-out duration-500'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'>
							<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
						</TransitionChild>

						<div className='fixed inset-0 overflow-hidden'>
							<div className='absolute inset-0 overflow-hidden'>
								<div className='pointer-events-none fixed inset-y-0 left-0 flex max-w-full'>
									<TransitionChild
										as={Fragment}
										enter='transform transition ease-in-out duration-500 sm:duration-700'
										enterFrom='-translate-x-full'
										enterTo='-translate-x-0'
										leave='transform transition ease-in-out duration-500 sm:duration-700'
										leaveFrom='-translate-x-0'
										leaveTo='-translate-x-full'>
										<DialogPanel className='pointer-events-auto relative w-screen max-w-max'>
											<TransitionChild
												as={Fragment}
												enter='ease-in-out duration-500'
												enterFrom='opacity-0'
												enterTo='opacity-100'
												leave='ease-in-out duration-500'
												leaveFrom='opacity-100'
												leaveTo='opacity-0'>
												<div className='absolute right-0 top-0 -mr-8 flex pl-4 pt-4 sm:-mr-10'>
													<button
														type='button'
														className='relative rounded-md text-white outline-none'
														onClick={() => setOpen(false)}>
														<span className='absolute -inset-2.5' />
														<span className='sr-only'>Close panel</span>
														<HiXMark className='h-6 w-6' aria-hidden='true' />
													</button>
												</div>
											</TransitionChild>
											<SidebarContent user={user} setOpen={setOpen} />
										</DialogPanel>
									</TransitionChild>
								</div>
							</div>
						</div>
					</Dialog>
				</Transition>
			</div>
		</nav>
	)
}

const SignOutLoading = ({ open }: { open: boolean }) => {
	return (
		<Transition show={open} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={() => {}}>
				<TransitionChild
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</TransitionChild>

				<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
					<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<TransitionChild
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
							<DialogPanel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md'>
								<div className='flex h-auto w-full items-center justify-center rounded-md py-10 shadow'>
									<div className='flex h-16 p-2.5 w-16 items-center justify-center rounded-full bg-white'>
										<Image src={Logo} width={512} height={512} alt='Logo' loading='eager' />
										<div className='border-accent absolute h-16 w-16 animate-spin rounded-full border-4 border-solid border-l-transparent border-r-transparent' />
									</div>
									<div className='flex flex-col gap-2 p-4'>
										<p className='text-lg font-semibold'>Signing Out...</p>
										<p className='text-sm text-gray-500'>Please wait while we sign you out.</p>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default Sidebar
