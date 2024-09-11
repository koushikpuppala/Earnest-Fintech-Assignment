import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { UserDecodedData, EnhancedRequest } from '@import/types'

export const verifyToken = (req: EnhancedRequest, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) return res.status(401).json({ error: 'No token provided' })

		const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as UserDecodedData

		req.userId = userId

		next()
	} catch (err) {
		res.status(401).json({ error: err instanceof Error ? err.message : 'Invalid token' })
	}
}
