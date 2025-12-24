import { isValidObjectId, Types } from 'mongoose'
import { Request, Response } from 'express'
import { handler } from '../../utils/handler.js'
import { AppError } from '../../utils/AppError.js'
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from '../../utils/http.js'
import authService from './auth.service.js'

const ONE_HOUR = 1000 * 60 * 60

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
  if (!req.userId) {
    throw new AppError(UNAUTHORIZED, 'unauthorized')
  }

  if (!isValidObjectId(req.userId)) {
    throw new AppError(BAD_REQUEST, 'invalid user id')
  }

  const id = new Types.ObjectId(req.userId)
  const user = await authService.me(id)

  return res.status(OK).json(user)
})

function _createCookie(res: Response<any, Record<string, any>>, token: string) {
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ONE_HOUR,
  })
}

export default {
  register,
  login,
  logout,
  me,
}
