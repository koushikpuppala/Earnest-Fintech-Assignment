'use server'

import { SESSION_NAME } from '@import/constants'
import { getCookie } from '@import/cookies'

export const getUser = async () => {
	try {
		const token = (await getCookie(SESSION_NAME)) ?? null

		if (!token) return null

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
			headers: { Authorization: `Bearer ${token}` },
		})

		if (!response.ok) throw new Error('Failed to fetch user')

		const { user } = await response.json()

		return user
	} catch (error) {
		console.log(error)
		return null
	}
}
