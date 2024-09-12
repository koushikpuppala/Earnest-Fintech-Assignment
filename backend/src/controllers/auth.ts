import { SESSION_EXPIRE, VERIFICATION_EXPIRE, VERIFICATION_TEMPLATE } from '@import/constants'
import { EnhancedRequest, VerificationDecodedData } from '@import/types'
import { sign, verify } from 'jsonwebtoken'
import { sendMail } from '@import/services'
import { compare, hash } from 'bcryptjs'
import { prisma } from '@import/prisma'
import { Response } from 'express'

export const registration = async (req: EnhancedRequest, res: Response) => {
	try {
		const { name, email, password } = req.body

		if (!name || !email || !password)
			return res.status(400).json({ error: 'Name, email and password are required' })

		const userExists = await prisma.user.findUnique({ where: { email } })

		if (userExists) return res.status(400).json({ error: 'User already exists' })

		const hashedPassword = await hash(password, Number(process.env.HASH_SALT!))

		const { verificationToken } = await prisma.user.create({ data: { name, email, password: hashedPassword } })

		const token = sign({ verificationToken }, process.env.JWT_SECRET!, { expiresIn: VERIFICATION_EXPIRE })

		await sendMail(email, 'Verify your email', VERIFICATION_TEMPLATE(name, token))

		return res
			.status(201)
			.json({ message: 'User registered successfully, please verify your email address', token })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
	}
}

export const authentication = async (req: EnhancedRequest, res: Response) => {
	try {
		const { email, password } = req.body

		const user = await prisma.user.findUnique({ where: { email } })

		if (!user) return res.status(401).json({ error: 'Invalid credentials' })

		const valid = await compare(password, user.password)

		if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

		if (!user.verified)
			return res.status(401).json({ error: 'User not verified. Please check your email to verify your account' })

		const token = sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: SESSION_EXPIRE })

		return res.status(200).json({ message: 'User logged in successfully', token })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
	}
}

export const sendVerification = async (req: EnhancedRequest, res: Response) => {
	try {
		const { email } = req.body

		const user = await prisma.user.findUnique({ where: { email } })

		if (!user) return res.status(404).json({ error: 'User not found' })

		const { verified, verificationToken } = user

		if (verified) return res.status(400).json({ error: 'User already verified' })

		const token = sign({ verificationToken }, process.env.JWT_SECRET!, { expiresIn: VERIFICATION_EXPIRE })

		await sendMail(email, 'Verify your email', VERIFICATION_TEMPLATE(user.name, token))

		return res.status(200).json({ message: 'Verification email sent successfully', token })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
	}
}

export const verification = async (req: EnhancedRequest, res: Response) => {
	try {
		const { token } = req.body

		const { verificationToken } = verify(token, process.env.JWT_SECRET!) as VerificationDecodedData

		const user = await prisma.user.findUnique({ where: { verificationToken } })

		if (!user) return res.status(404).json({ error: 'User not found or verification token expired' })

		await prisma.user.update({ where: { id: user.id }, data: { verified: true, verificationToken: null } })

		return res.status(200).json({ message: 'User verified successfully' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
	}
}
