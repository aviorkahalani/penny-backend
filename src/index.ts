import 'dotenv/config'
import './db'

import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorHandler'

import authRoutes from './api/auth/auth.routes.js'
import budgetRoutes from './api/budget/budget.routes.js'
import categoryRoutes from './api/category/category.routes.js'
import transactionRoutes from './api/transaction/transaction.routes.js'
import dashboardRoutes from './api/dashboard/dashboard.routes.js'

const app: Express = express()
const port = process.env.PORT || 3030
const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}

// middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world')
})

// routes
app.use('/api/auth', authRoutes)
app.use('/api/budget', budgetRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/transaction', transactionRoutes)
app.use('/api/dashboard', dashboardRoutes)

// middlewares
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`)
})
