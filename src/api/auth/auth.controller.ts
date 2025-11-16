import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { handler } from '../../utils/handler'
import { AppError } from '../../utils/AppError'
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from '../../utils/http'
import authService from './auth.service'

const register = handler(async (req: Request, res: Response) => {
  const { email, name, password } = req.body

  const { user, token } = await authService.register({
    email,
    name,
    password,
  })

  _createCookie(res, token)
  return res.status(CREATED).json(user)
})

const login = handler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const { user, token } = await authService.login({ email, password })

  _createCookie(res, token)
  return res.status(OK).json(user)
})

const logout = handler(async (req: Request, res: Response) => {
  req.userId = null
  res.clearCookie('access_token')
  return res.status(OK).json({})
})

const me = handler(async (req: Request, res: Response) => {
  const userId = req.userId

  if (!userId) {
    throw new AppError(UNAUTHORIZED, 'unauthorized')
  }

  if (!mongoose.isValidObjectId(userId)) {
    throw new AppError(BAD_REQUEST, 'invalid id')
  }

  const id = new mongoose.Types.ObjectId(userId)
  const user = await authService.me(id)

  return res.status(OK).json(user)
})

function _createCookie(res: Response<any, Record<string, any>>, token: string) {
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60,
  })
}

export default {
  register,
  login,
  logout,
  me,
}
