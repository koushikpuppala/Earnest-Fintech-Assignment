import { prisma } from '@import/prisma'
import { EnhancedRequest } from '@import/types'
import { Response } from 'express'

export const getTasks = async (req: EnhancedRequest, res: Response) => {
	try {
		const tasks = await prisma.task.findMany({ where: { userId: req.userId } })

		return res.status(200).json({ message: 'Tasks fetched successfully', tasks })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
	}
}

export const getTask = async (req: EnhancedRequest, res: Response) => {
	try {
		const { id } = req.params

		const task = await prisma.task.findUnique({ where: { id } })

		if (!task) return res.status(404).json({ error: 'Task not found' })

		return res.status(200).json({ message: 'Task fetched successfully', task })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
	}
}

export const createTask = async (req: EnhancedRequest, res: Response) => {
	try {
		const { title, description, dueDate } = req.body

		const task = await prisma.task.create({
			data: {
				title,
				description,
				dueDate: new Date(dueDate),
				user: {
					connect: { id: req.userId },
				},
			},
		})

		return res.status(201).json({ message: 'Task created successfully', task })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
	}
}

export const updateTask = async (req: EnhancedRequest, res: Response) => {
	try {
		const { id } = req.params
		const { title, description, status, dueDate } = req.body

		const task = await prisma.task.update({
			where: { id },
			data: { title, description, status, dueDate: new Date(dueDate) },
		})

		return res.status(200).json({ message: 'Task updated successfully', task })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
	}
}

export const deleteTask = async (req: EnhancedRequest, res: Response) => {
	try {
		const { id } = req.params

		await prisma.task.delete({ where: { id } })

		return res.status(200).json({ message: 'Task deleted successfully' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
	}
}
