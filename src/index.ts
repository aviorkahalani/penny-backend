import express, { Express, Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './api/auth/auth.routes'

import 'dotenv/config'
import './db'
import errorHandler from './middlewares/errorHandler'

const app: Express = express()
const port = process.env.PORT
const corsOptions: CorsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world')
})

// routes
app.use('/api/auth', authRoutes)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`)
})
