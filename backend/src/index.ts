import { config } from 'dotenv'

config({ path: '.env' })

import { default as routes } from './routes'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const PORT = Number(process.env.PORT) || 8081

const whitelist = { frontend: process.env.FRONTEND_URL! }

const origin = [...Object.values(whitelist)]

app.use(cors({ origin: origin, methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (_req, res) => res.status(200).json({ message: 'API server Running /' }))

app.get('/health', (_req, res) => res.status(200).json({ message: 'API Health Check' }))

app.use('/api', routes)

app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`))
