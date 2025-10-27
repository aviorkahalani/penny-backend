import jwt, { type JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '../utils/http'

interface Payload extends JwtPayload {
  userId: string
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.access_token

    if (!token) {
      return res.status(UNAUTHORIZED).json({ message: 'unauthorized' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Payload
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error })
  }
}

export default isAuthenticated
