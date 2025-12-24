import jwt, { type JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { UNAUTHORIZED } from '../utils/http.js'
import { handler } from '../utils/handler.js'
import { AppError } from '../utils/AppError.js'

interface Payload extends JwtPayload {
  userId: string
}

const isAuthenticated = handler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token

    if (!token) {
      throw new AppError(UNAUTHORIZED, 'unauthorized')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Payload
    req.userId = decoded.userId
    next()
  }
)

export default isAuthenticated
