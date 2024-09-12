import { Logo } from '@import/assets'
import Image from 'next/image'

const Loading = () => {
	return (
		<div className='flex h-screen w-full items-center justify-center rounded-md'>
			<div className='flex h-16 w-16 items-center justify-center rounded-full bg-white'>
				<Image src={Logo} width={42} height={42} alt='Logo' loading='eager' />
				<div className='absolute h-16 w-16 animate-spin rounded-full border-4 border-solid border-accent border-l-transparent border-r-transparent' />
			</div>
		</div>
	)
}

export default Loading
