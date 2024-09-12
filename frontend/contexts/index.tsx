'use client'

import { createContext, useContext } from 'react'
import { AuthContextProps, ChildrenProps } from '@import/types'
import { toast } from 'react-toastify'
import { removeCookie, setCookie } from '@import/cookies'
import { SESSION_NAME, TOAST_OPTIONS } from '@import/constants'
import { useRouter } from 'next/navigation'

const AuthContext = createContext<AuthContextProps>({
	login: () => new Promise<void>(() => {}),
	register: () => new Promise<void>(() => {}),
	verifyEmail: () => new Promise<void>(() => {}),
	emailVerification: () => new Promise<void>(() => {}),
	logout: () => new Promise<void>(() => {}),
})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: ChildrenProps) => {
	const router = useRouter()

	const login: AuthContextProps['login'] = async (email, password) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			})

			const data = await response.json()

			if (!response.ok) {
				toast.error(data.error, TOAST_OPTIONS)
				throw new Error(data.error)
			}

			await setCookie(SESSION_NAME, data.token)

			router.push('/')
		} catch (error) {
			process.env.NODE_ENV === 'development' && console.log(error)
		}
	}

	const register: AuthContextProps['register'] = async (name, email, password) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password }),
			})

			const data = await response.json()

			if (!response.ok) toast.error(data.error, TOAST_OPTIONS)
			else router.push('/login?verify-email-sent=true')
		} catch (error) {
			process.env.NODE_ENV === 'development' && console.log(error)
		}
	}

	const verifyEmail: AuthContextProps['verifyEmail'] = async (email) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-verification`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			})

			const data = await response.json()

			if (!response.ok) toast.error(data.error, TOAST_OPTIONS)
			else router.push('/login?verify-email-sent=true')
		} catch (error) {
			process.env.NODE_ENV === 'development' && console.log(error)
		}
	}

	const emailVerification: AuthContextProps['emailVerification'] = async (token) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token }),
			})

			const data = await response.json()

			if (!response.ok) toast.error(data.error, TOAST_OPTIONS)
			else router.push('/login?email-verified=true')
		} catch (error) {
			process.env.NODE_ENV === 'development' && console.log(error)
		}
	}

	const logout: AuthContextProps['logout'] = async () => {
		try {
			await removeCookie(SESSION_NAME)
			router.push('/login')
		} catch (error) {
			process.env.NODE_ENV === 'development' && console.log(error)
		}
	}

	const value = { login, register, verifyEmail, emailVerification, logout }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
