import '@import/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import type { RootLayoutProps } from '@import/types'
import { AuthContextProvider } from '@import/contexts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: { default: 'Task Management System', template: '%s | Task Management System' },
	description: 'Task Management System is a modern web application that helps you manage your tasks with ease.',
	applicationName: 'Task Management System',
	keywords: [],
	formatDetection: { email: true, address: true, telephone: true, date: true, url: true },
}

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthContextProvider>
					<ToastContainer />
					{children}
				</AuthContextProvider>
			</body>
		</html>
	)
}

export default RootLayout
