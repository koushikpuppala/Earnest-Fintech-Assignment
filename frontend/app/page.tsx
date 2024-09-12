import { getTasks, getUser } from '@import/actions'
import { Sidebar, TasksData } from '@import/components'

export const dynamic = 'force-dynamic'

const HomePage = async () => {
	const [user, tasks] = await Promise.all([getUser(), getTasks()])

	return (
		<div className='relative flex h-screen w-full overflow-hidden'>
			<Sidebar user={user} />
			<main className='flex h-screen w-full flex-col overflow-y-auto px-4 py-2'>
				<div className='flex flex-col text-center items-center justify-center gap-1 pb-8 pt-4'>
					<h1 className='text-2xl lg:text-4xl font-bold text-gray-700'>Task Management System</h1>
					<span className='text-sm font-light text-gray-500'>
						Welcome to the dashboard. Here you can manage your tasks.
					</span>
				</div>
				<TasksData tasks={tasks} />
			</main>
		</div>
	)
}

export default HomePage
