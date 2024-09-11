declare namespace NodeJS {
	export interface ProcessEnv {
		readonly PORT: string
		readonly NODE_ENV: 'development' | 'production' | 'test'
		readonly MAIL_HOST: string
		readonly MAIL_USER: string
		readonly MAIL_PASS: string
		readonly JWT_SECRET: string
		readonly FRONTEND_URL: string
		readonly DATABASE_URL: string
		readonly HASH_SALT: string
	}
}
