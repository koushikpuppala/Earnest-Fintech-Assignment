import { EnhancedRequest } from '@import/types'
import { prisma } from '@import/prisma'
import { Response } from 'express'

export const getUser = async (req: EnhancedRequest, res: Response) => {
	try {
		if (!req.userId) return res.status(401).json({ error: 'You must be authenticated to access this resource.' })

		const user = await prisma.user.findUnique({
			where: { id: req.userId },
			select: {
				id: true,
				name: true,
				email: true,
				verified: true,
				tasks: {
					orderBy: { createdAt: 'desc' },
				},
			},
		})

		if (!user) return res.status(404).json({ error: 'User not found.' })

		return res.status(200).json({ message: 'User fetched successfully', user })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
	}
}
