import { User } from '../../db/models/user'
import { Types } from 'mongoose'

interface Credentials {
  email: string
  name: string
  password: string
}

async function register(credentials: Credentials) {
  //
}

async function login(credentials: Omit<Credentials, 'name'>) {
  //
}

async function me(id: Types.ObjectId) {
  //
}

export default {
  register,
  login,
  me,
}
