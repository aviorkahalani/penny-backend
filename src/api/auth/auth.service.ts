import jwt from 'jsonwebtoken'
import { User } from '../../db/models/user'
import { Types } from 'mongoose'
import { AppError } from '../../utils/AppError'
import { BAD_REQUEST } from '../../utils/http'

interface Credentials {
  email: string
  name: string
  password: string
}

async function register(credentials: Credentials) {
  const isUserExist = await User.findOne({ email: credentials.email })
  if (isUserExist) {
    throw new AppError(BAD_REQUEST, 'user already exist')
  }

  const user = new User(credentials)
  await user.save()

  const token = _generate_token(user._id)
  return { user, token }
}

async function login(credentials: Omit<Credentials, 'name'>) {
  const { email, password } = credentials
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('user does not exist')
  }

  const isMatchedPassword = await user.comparePasswords(password)

  if (!isMatchedPassword) {
    throw new Error('invalid user password')
  }

  const token = _generate_token(user._id)
  return { user, token }
}

async function me(id: Types.ObjectId) {
  const user = await User.findById(id).select('-password')
  if (!user) {
    throw new Error('user does not exist')
  }

  return user
}

function _generate_token(userId: Types.ObjectId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export default {
  register,
  login,
  me,
}
