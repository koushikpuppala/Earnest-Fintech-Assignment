import { Router } from 'express'
import { default as authRouter } from './auth'
import { default as tasksRouter } from './tasks'
import { default as userRouter } from './user'
import { verifyToken } from '@import/middlewares'

const router = Router()

router.use('/auth', authRouter)

router.use('/tasks', verifyToken, tasksRouter)

router.use('/user', verifyToken, userRouter)

export default router
