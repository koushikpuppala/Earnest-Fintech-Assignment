import { getUser } from '@import/controllers'
import { Router } from 'express'

const router = Router()

router.get('/', getUser)

export default router
