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
    name: { type: String, required: true, lowercase: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
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

export const User = mongoose.model<IUser, UserModel>('user', schema)
