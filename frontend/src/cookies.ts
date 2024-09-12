'use server'

import { cookies } from 'next/headers'

export const setCookie = async (name: string, value: string) => {
	cookies().set(name, value, {
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		httpOnly: true,
		path: '/',
		maxAge: 60 * 60,
	})
}

export const removeCookie = async (name: string) => {
	cookies().delete({
		name,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		httpOnly: true,
		path: '/',
	})
}

export const getCookie = async (name: string) => {
	return cookies().get(name)?.value
}
