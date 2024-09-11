import { Request } from 'express'

export type EnhancedRequest = Request & { userId?: string }

export type UserDecodedData = { userId: string }

export type VerificationDecodedData = { verificationToken: string }
