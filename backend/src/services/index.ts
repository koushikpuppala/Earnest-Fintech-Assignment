import { createTransport } from 'nodemailer'

const mailer = createTransport({
	host: process.env.MAIL_HOST,
	port: 587,
	secure: false,
	auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
	tls: { ciphers: 'SSLv3', rejectUnauthorized: false },
})

export const sendMail = async (to: string, subject: string, html: string) =>
	await mailer.sendMail({
		from: `Koushikpuppala <no-reply@koushikpuppala.com>`,
		sender: 'no-reply@koushikpuppala.com',
		to,
		subject,
		html,
	})
