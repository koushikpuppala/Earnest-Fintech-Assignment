import { authentication, registration, sendVerification, verification } from '@import/controllers'
import { Router } from 'express'

const router = Router()

router.post('/register', registration)
router.post('/login', authentication)
router.post('/send-verification', sendVerification)
router.post('/verify/:token', verification)

export default router
