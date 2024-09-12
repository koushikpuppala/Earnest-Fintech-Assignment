'use client'

import { Fragment, useEffect, useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import classNames from 'classnames'
import { useFormStatus } from 'react-dom'
import { createTask, deleteTask, updateTask } from '@import/actions'
import { HiXMark } from 'react-icons/hi2'
import { TaskCreateModifyComponentProps, SubmitButtonProps } from '@import/types'

const TaskCreateModify = ({ open, setOpen, selected }: TaskCreateModifyComponentProps) => {
	const [isDisabled, setIsDisabled] = useState(true)
	const [isModified, setIsModified] = useState(false)
	const [editing, setEditing] = useState(selected ? false : true)
	const [deleting, setDeleting] = useState(false)
	const [form, setForm] = useState({
		title: selected?.title || '',
		description: selected?.description || '',
		dueDate: selected?.dueDate ? new Date(selected.dueDate).toISOString().split('T')[0] : '',
		status: selected?.status === 'overdue' ? 'pending' : selected?.status || '',
	})

	const [error, setError] = useState({
		title: '',
		dueDate: '',
	})

	useEffect(() => {
		if (!open)
			setForm({
				title: selected?.title || '',
				description: selected?.description || '',
				dueDate: selected?.dueDate ? new Date(selected.dueDate).toLocaleDateString().split('T')[0] : '',
				status: selected?.status === 'overdue' ? 'pending' : selected?.status || '',
			})
	}, [open, selected])

	useEffect(() => {
		console.log(form)
		if (
			selected &&
			(form.title !== selected.title ||
				form.description !== selected.description ||
				form.dueDate !== selected.dueDate ||
				form.status !== selected.status)
		) {
			setIsModified(true)
		} else {
			setIsModified(false)
		}

		if (form.title.length === 0 || form.dueDate.length === 0) setIsDisabled(true)
		else setIsDisabled(false)
	}, [form, selected])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		console.log(e.target.name + ' - ' + e.target.value)

		switch (e.target.name) {
			case 'title':
				setForm((prev) => ({ ...prev, title: e.target.value }))

				if (e.target.value.length === 0) setError((prev) => ({ ...prev, title: 'Title is required' }))
				else setError((prev) => ({ ...prev, title: '' }))
				break
			case 'description':
				setForm((prev) => ({ ...prev, description: e.target.value }))

				break
			case 'dueDate':
				setForm((prev) => ({ ...prev, dueDate: e.target.value }))

				if (e.target.value.length === 0) setError((prev) => ({ ...prev, dueDate: 'Due date is required' }))
				else setError((prev) => ({ ...prev, dueDate: '' }))
				break
			case 'status':
				setForm((prev) => ({ ...prev, status: e.target.value }))
				break
		}
	}

	return (
		<Transition.Root show={open} as={Fragment}>
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
							<DialogPanel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
								<div className='absolute right-2 top-2'>
									<button
										type='button'
										className='text-gray-600 outline-none hover:text-gray-400'
										onClick={() => setOpen(false)}>
										<span className='sr-only'>Close panel</span>
										<HiXMark className='h-6 w-6' aria-hidden='true' />
									</button>
								</div>
								<form
									action={(form) => {
										if (selected) updateTask(selected.id, form).then(() => setOpen(false))
										else createTask(form).then(() => setOpen(false))
									}}
									className='w-full'>
									<div className='w-full px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
										<h2 className='text-base font-semibold leading-7 text-gray-900'>
											{selected ? (editing ? 'Update Task' : 'View Task') : 'Create Task'}
										</h2>
										<p className='mt-1 text-sm leading-6 text-gray-600'>
											{selected
												? editing
													? 'Update task details.'
													: 'View task details.'
												: 'Create a new task.'}
										</p>

										<div className='mt-2 flex flex-col gap-4'>
											<div className='flex w-full flex-col'>
												<label
													htmlFor='title'
													className='block text-sm font-medium leading-6 text-gray-900'>
													Title <span className='text-red-500'>*</span>
												</label>
												<div className='mt-2'>
													<input
														disabled={editing ? false : true}
														type='text'
														name='title'
														id='title'
														onChange={handleChange}
														value={form.title}
														placeholder='Enter task title...'
														className='focus:ring-accent block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6'
													/>
												</div>
												{<span className='text-sm text-red-500'>{error.title}</span>}
											</div>

											<div className='flex w-full flex-col'>
												<label
													htmlFor='description'
													className='block text-sm font-medium leading-6 text-gray-900'>
													Description
												</label>
												<div className='mt-2 w-full'>
													<textarea
														disabled={editing ? false : true}
														id='description'
														name='description'
														onChange={handleChange}
														value={form.description}
														rows={4}
														placeholder='Enter task description...'
														className='focus:ring-accent block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6'
													/>
												</div>
											</div>

											<div className='flex w-full flex-col'>
												<label
													htmlFor='dueDate'
													className='block text-sm font-medium leading-6 text-gray-900'>
													Due Date <span className='text-red-500'>*</span>
												</label>
												<div className='mt-2'>
													<input
														disabled={editing ? false : true}
														type='date'
														name='dueDate'
														id='dueDate'
														onChange={handleChange}
														min={new Date().toISOString().split('T')[0]}
														value={form.dueDate}
														className='focus:ring-accent block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6'
													/>
												</div>
												{<span className='text-sm text-red-500'>{error.dueDate}</span>}
											</div>

											{selected && (
												<div className='flex w-full flex-col'>
													<label
														htmlFor='status'
														className='block text-sm font-medium leading-6 text-gray-900'>
														Status
													</label>
													<div className='mt-2'>
														<select
															disabled={editing ? false : true}
															name='status'
															id='status'
															onChange={handleChange}
															value={form.status}
															className='focus:ring-accent block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6'>
															<option value='pending'>Pending</option>
															<option value='in-progress'>In Progress</option>
															<option value='completed'>Completed</option>
														</select>
													</div>
												</div>
											)}
										</div>
									</div>
									<div className='gap-4 bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6'>
										{selected && (
											<button
												onClick={async () => {
													setDeleting(true)
													await deleteTask(selected.id)
														.then(() => setOpen(false))
														.finally(() => setDeleting(false))
												}}
												type='button'
												className='border-primary text-primary inline-block w-full rounded border px-3 py-2 text-base font-medium hover:bg-opacity-90 hover:shadow-lg'>
												{deleting ? (
													<div className='flex flex-row items-center justify-center gap-4 align-middle'>
														<div className='border-primary h-6 w-6 animate-spin rounded-full border-2 border-solid border-l-transparent border-r-transparent' />
														Deleting...
													</div>
												) : (
													'Delete Task'
												)}
											</button>
										)}
										{editing ? (
											<SubmitButton
												title={selected ? 'Save Task' : 'Create Task'}
												loadingTitle={selected ? 'Saving...' : 'Creating...'}
												isDisabled={selected ? isDisabled || !isModified : isDisabled}
											/>
										) : (
											<button
												type='submit'
												onClick={() => setEditing(true)}
												className='bg-primary hover:bg-opacity-95 inline-block w-full rounded border bg-opacity-100 px-3 py-2 text-base font-medium text-white outline-none transition-all delay-75 hover:shadow-lg'>
												Update Task
											</button>
										)}
									</div>
								</form>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

const SubmitButton = ({ title, loadingTitle, isDisabled }: SubmitButtonProps) => {
	const { pending } = useFormStatus()

	return (
		<button
			type='submit'
			disabled={isDisabled || pending}
			className={classNames(
				{
					'bg-primary cursor-not-allowed bg-opacity-50': isDisabled || pending,
					'bg-primary hover:bg-opacity-95': !isDisabled && !pending,
				},
				'inline-block w-full rounded border bg-opacity-100 px-3 py-2 text-base font-medium text-white outline-none transition-all delay-75 hover:shadow-lg'
			)}>
			{pending ? (
				<div className='flex flex-row items-center justify-center gap-4 align-middle'>
					<div className='h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-l-transparent border-r-transparent' />
					{loadingTitle}
				</div>
			) : (
				title
			)}
		</button>
	)
}

export default TaskCreateModify
