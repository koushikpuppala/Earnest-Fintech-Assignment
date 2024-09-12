'use server'

import { SESSION_NAME } from '@import/constants'
import { getCookie } from '@import/cookies'
import { revalidateTag } from 'next/cache'

export const getTasks = async () => {
	try {
		const token = (await getCookie(SESSION_NAME)) ?? null

		if (!token) return []

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
			headers: { Authorization: `Bearer ${token}` },
			next: { revalidate: 60 * 60 * 24, tags: ['tasks'] },
		})

		if (!response.ok) throw new Error('Failed to fetch tasks')

		const { tasks } = await response.json()

		return tasks
	} catch (error) {
		console.log(error)
		return []
	}
}

export const getTask = async (id: string) => {
	try {
		const token = (await getCookie(SESSION_NAME)) ?? null

		if (!token) return null

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		})

		if (!response.ok) throw new Error('Failed to fetch task')

		const { task } = await response.json()

		return task
	} catch (error) {
		console.log(error)
		return null
	}
}

export const createTask = async (form: FormData) => {
	try {
		const token = (await getCookie(SESSION_NAME)) ?? null

		if (!token) return null

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify({
				title: form.get('title')?.toString(),
				description: form.get('description')?.toString(),
				status: form.get('status')?.toString(),
				dueDate: form.get('dueDate')?.toString(),
			}),
		})

		if (!response.ok) throw new Error('Failed to create task')

		const { task } = await response.json()

		return task
	} catch (error) {
		console.log(error)
		return null
	} finally {
		revalidateTag('tasks')
	}
}

export const updateTask = async (id: string, form: FormData) => {
	try {
		const token = (await getCookie(SESSION_NAME)) ?? null

		if (!token) return null

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify({
				title: form.get('title')?.toString(),
				description: form.get('description')?.toString(),
				dueDate: form.get('dueDate')?.toString(),
				status: form.get('status')?.toString(),
			}),
		})

		if (!response.ok) throw new Error('Failed to update task')

		const { task } = await response.json()

		return task
	} catch (error) {
		console.log(error)
		return null
	} finally {
		revalidateTag('tasks')
	}
}

export const deleteTask = async (id: string) => {
	try {
		const token = (await getCookie(SESSION_NAME)) ?? null

		if (!token) return null

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` },
		})

		if (!response.ok) throw new Error('Failed to delete task')

		return true
	} catch (error) {
		console.log(error)
		return false
	} finally {
		revalidateTag('tasks')
	}
}
