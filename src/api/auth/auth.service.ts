import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { User } from '../../db/models/user.js'
import { AppError } from '../../utils/AppError.js'
import { BAD_REQUEST, NOT_FOUND } from '../../utils/http.js'

interface Credentials {
  email: string
  name: string
  password: string
}

const register = async (credentials: Credentials) => {
  const user = new User(credentials)
  await user.save()

  const token = _generate_token(user._id)
  const { password: pwd, ...safeUser } = user.toObject()

  return { user: safeUser, token }
}

const login = async (credentials: Omit<Credentials, 'name'>) => {
  const { email, password } = credentials
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new AppError(NOT_FOUND, 'user not found')
  }

  const isMatchedPassword = await user.comparePasswords(password)

  if (!isMatchedPassword) {
    throw new AppError(BAD_REQUEST, 'incorrect password')
  }

  const token = _generate_token(user._id)
  const { password: pwd, ...safeUser } = user.toObject()

  return { user: safeUser, token }
}

const me = async (id: Types.ObjectId) => {
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(NOT_FOUND, 'user not found')
  }

  return user
}

const _generate_token = (userId: Types.ObjectId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export default {
  register,
  login,
  me,
}
