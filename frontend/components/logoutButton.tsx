'use client'

import { useAuth } from '@import/contexts'

const LogoutButton = ({ className }: { className: string }) => {
	const { logout } = useAuth()

	return (
		<span onClick={logout} className={className}>
			Logout
		</span>
	)
}

export default LogoutButton
