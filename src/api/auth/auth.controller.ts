import { Request, Response } from 'express'
import authService from './auth.service'
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from '../../utils/http'
import mongoose from 'mongoose'

async function register(req: Request, res: Response) {
  try {
    const { email, name, password } = req.body
    const { user, token } = await authService.register({
      email,
      name,
      password,
    })

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60, // 1 hour
    })

    return res.status(CREATED).json(user)
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error })
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    const { user, token } = await authService.login({ email, password })

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60, // 1 hour
    })

    return res.status(OK).json(user)
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error })
  }
}

async function logout(req: Request, res: Response) {
  try {
    req.userId = null
    res.clearCookie('access_token')
    return res.status(OK).json({})
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error })
  }
}

async function me(req: Request, res: Response) {
  try {
    const userId = req.userId

    if (!userId) {
      return res.status(UNAUTHORIZED).json({ message: 'unauthorized' })
    }

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(BAD_REQUEST).json({ message: 'invalid id' })
    }

    const id = new mongoose.Types.ObjectId(userId)
    const user = await authService.me(id)

    return res.status(OK).json(user)
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error })
  }
}

export default {
  register,
  login,
  logout,
  me,
}
