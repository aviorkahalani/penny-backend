import express, { Express, Request, Response } from 'express'
import authRoutes from './api/auth/auth.routes'

import 'dotenv/config'
import './db'

const app: Express = express()
const port = process.env.PORT

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world')
})

// routes
app.use('/api/auth', authRoutes)

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`)
})
