'use client'

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { IoSearchOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { Tasks } from '@import/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { debounce } from 'lodash'
import TaskCreateModify from './taskCreateModify'
import classNames from 'classnames'
import { readableDate } from '@import/date'

const TasksTable = ({ tasks }: { tasks: Tasks[] }) => {
	const limit = 10
	const [page, setPage] = useState(1)
	const [total, setTotal] = useState(0)
	const [selectedTask, setSelectedTask] = useState<Tasks | null>(null)
	const [open, setOpen] = useState(false)
	const [filteredTasks, setFilteredTasks] = useState<Tasks[]>(tasks)
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()
	const status = searchParams.get('status') || ''
	const search = searchParams.get('search') || ''

	useEffect(() => {
		setTotal(filteredTasks.length)
	}, [filteredTasks])

	useEffect(() => {
		if (page > total / limit) setPage(1)
	}, [page, total])

	useEffect(() => {
		setFilteredTasks(
			tasks.filter(
				(task) =>
					task.title.toLowerCase().includes(search.toLowerCase()) &&
					task.status.toLowerCase().includes(status.toLowerCase())
			)
		)
	}, [search, status, tasks])

	useEffect(() => {
		if (!open) setSelectedTask(null)
	}, [open])

	const handleUpdateUserRole = (taskId: string) => {
		setSelectedTask(filteredTasks.find(({ id }) => id === taskId) ?? null)
		setOpen(true)
	}

	const debouncedSearch = debounce((value: string) => {
		const searchParams = new URLSearchParams()

		if (value) searchParams.set('search', value)
		else searchParams.delete('search')

		router.replace(`${pathname}?${searchParams.toString()}`)
	}, 250)

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex w-full items-center justify-between py-3'>
				<div className='flex flex-1 justify-between flex-col gap-2 md:flex-row items-center'>
					<div className='relative w-full md:w-1/3'>
						<label htmlFor='Search' className='sr-only'>
							Search
						</label>

						<input
							type='text'
							id='Search'
							defaultValue={search}
							onChange={(e) => debouncedSearch(e.target.value)}
							placeholder='Search for...'
							className='w-full rounded-md border border-zinc-300 py-2.5 pe-10 ps-3 shadow-sm outline-none sm:text-sm'
						/>

						<span className='absolute inset-y-0 end-0 grid w-10 place-content-center'>
							<span className='sr-only'>Search</span>
							<IoSearchOutline className='h-5 w-5' />
						</span>
					</div>

					<button
						onClick={() => {
							setOpen(true)
						}}
						className='w-fit inline-block px-6 py-2 text-base font-medium text-white bg-primary rounded hover:bg-opacity-90'>
						Create Task
					</button>
				</div>
			</div>
			{open && <TaskCreateModify open={open} setOpen={setOpen} selected={selectedTask} />}
			{filteredTasks.length === 0 ? (
				<div className='flex flex-col items-center text-center justify-center p-10 h-full'>
					<h2 className='text-xl font-bold text-gray-700 mb-2'>
						No <span className='capitalize'>{status} </span>
						Tasks Available
					</h2>
					{status === 'completed' && (
						<p className='text-gray-500'>You don&apos;t have any completed tasks.</p>
					)}
					{status === 'in-progress' && (
						<p className='text-gray-500'>You don&apos;t have any in-progress tasks.</p>
					)}
					{status === 'pending' && <p className='text-gray-500'>You don&apos;t have any pending tasks.</p>}
					{status === 'overdue' && <p className='text-gray-500'>You don&apos;t have any overdue tasks.</p>}
					{status === '' && search === '' && (
						<p className='text-gray-500'>You haven&apos;t created any tasks yet.</p>
					)}
					{status === '' && search !== '' && (
						<p className='text-gray-500'>No tasks found for the search term.</p>
					)}
				</div>
			) : (
				<div className='rounded-lg border border-gray-200'>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y-2 divide-gray-200 text-base'>
							<thead className='ltr:text-left rtl:text-right'>
								<tr className='text-center'>
									<th className='divide-x whitespace-nowrap px-4 py-4 font-bold text-gray-900'>
										Title
									</th>
									<th className='divide-x whitespace-nowrap px-4 py-4 font-bold text-gray-900'>
										Description
									</th>
									<th className='divide-x whitespace-nowrap px-4 py-4 font-bold text-gray-900'>
										Due Date
									</th>
									<th className='divide-x whitespace-nowrap px-4 py-4 font-bold text-gray-900'>
										Status
									</th>
									<th className='divide-x whitespace-nowrap px-4 py-4 font-bold text-gray-900'></th>
								</tr>
							</thead>

							<tbody className='divide-y divide-gray-200'>
								{filteredTasks.map((task, index) =>
									page * limit - limit <= index && index < page * limit ? (
										<tr
											key={task.id}
											className={classNames('text-center even:bg-pink-50', {
												'bg-red-300': task.status === 'overdue',
											})}>
											<td className='whitespace-nowrap px-4 py-3 font-semibold capitalize text-gray-900'>
												{task.title.length > 30 ? task.title.slice(0, 30) + '...' : task.title}
											</td>
											<td className='divide-x whitespace-nowrap px-4 py-3 text-gray-700'>
												{task.description
													? task.description.length > 40
														? task.description.slice(0, 40) + '...'
														: task.description
													: 'No Description'}
											</td>
											<td className='whitespace-nowrap px-4 py-3 capitalize text-gray-700'>
												{readableDate(new Date(task.dueDate))}
											</td>
											<td
												className={classNames(
													'whitespace-nowrap px-4 py-3 text-gray-700 capitalize',
													{
														'text-green-500': task.status === 'completed',
														'text-yellow-500': task.status === 'in-progress',
														'text-red-500': task.status === 'pending',
													}
												)}>
												{task.status}
											</td>
											<td className='whitespace-nowrap px-4 py-3'>
												<button
													onClick={() => handleUpdateUserRole(task.id)}
													className='border-primary text-primary hover:bg-primary inline-block w-fit rounded border px-8 py-2 text-base font-medium hover:bg-opacity-90 hover:text-white'>
													View / Edit Task
												</button>
											</td>
										</tr>
									) : null
								)}
							</tbody>
						</table>
					</div>
					<div className='flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6'>
						<div className='flex flex-1 justify-between sm:hidden'>
							<span
								aria-current='page'
								onClick={() => {
									if (page > 1) setPage(page - 1)
								}}
								title='Previous'
								className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
								Previous
							</span>
							<div className='flex items-center'>
								<p className='text-sm text-gray-700'>
									Showing <span className='font-medium'>{page * limit - limit + 1}</span> to{' '}
									<span className='font-medium'>{page * limit > total ? total : page * limit}</span>{' '}
									of <span className='font-medium'>{total}</span> results
								</p>
							</div>
							<span
								aria-current='page'
								onClick={() => {
									if (page < total / limit) setPage(page + 1)
								}}
								title='Next'
								className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
								Next
							</span>
						</div>
						<div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
							<div>
								<p className='text-sm text-gray-700'>
									Showing <span className='font-medium'>{page * limit - limit + 1}</span> to{' '}
									<span className='font-medium'>{page * limit > total ? total : page * limit}</span>{' '}
									of <span className='font-medium'>{total}</span> results
								</p>
							</div>
							<div>
								<nav
									className='isolate inline-flex -space-x-px rounded-md shadow-sm'
									aria-label='Pagination'>
									<span
										onClick={() => {
											if (page > 1) setPage(page - 1)
										}}
										title='Previous'
										className='relative inline-flex items-center rounded-l-md border px-2 py-2 text-gray-400 hover:bg-gray-50'>
										<span className='sr-only'>Previous</span>
										<HiChevronLeft className='h-5 w-5' aria-hidden='true' />
									</span>
									<span
										aria-current='page'
										className='text-primary relative z-10 inline-flex items-center border bg-white px-4 py-2 text-base font-semibold'>
										{page}
									</span>
									<span
										onClick={() => {
											if (page < total / limit) setPage(page + 1)
										}}
										title='Next'
										className='relative inline-flex items-center rounded-r-md border px-2 py-2 text-gray-400 hover:bg-gray-50'>
										<span className='sr-only'>Next</span>
										<HiChevronRight className='h-5 w-5' aria-hidden='true' />
									</span>
								</nav>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default TasksTable
