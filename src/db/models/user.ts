import mongoose, { Schema, Model } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser {
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
}

interface UserMethods {
  comparePasswords(password: string): Promise<boolean>
}

type UserModel = Model<IUser, {}, UserMethods>

const schema = new Schema<IUser, Model<IUser>, UserMethods>(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: [true, 'email is already taken'],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'invalid email pattern'],
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
      minLength: [2, 'name must be at least 2 characters'],
      maxLength: [30, 'name must not exceed 50 characters'],
      trim: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, 'password is required'],
      minlength: [8, 'must be at least 8 characters'],
    },
  },
  {
    methods: {
      async comparePasswords(password) {
        return await bcrypt.compare(password, this.password)
      },
    },
    timestamps: true,
  }
)

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

export const User = mongoose.model<IUser, UserModel>('User', schema)
