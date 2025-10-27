import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser {
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const schema = new Schema<IUser>(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
)

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

export const User = mongoose.model<IUser>('user', schema)
