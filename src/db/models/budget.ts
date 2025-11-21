import mongoose, { Schema, Types } from 'mongoose'

export interface IBudget {
  userId: Types.ObjectId
  name: string
  currency: 'NIS' | 'USD'
  notes?: string
  date: {
    year: number
    month: number
  }
  createdAt: Date
  updatedAt: Date
}

const schema = new Schema<IBudget>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      maxLength: 120,
      trim: true,
      lowercase: true,
    },
    currency: {
      type: String,
      default: 'NIS',
    },
    notes: {
      type: String,
      maxLength: 240,
    },
    date: {
      year: {
        type: Number,
        required: true,
        default: new Date().getFullYear(),
      },
      month: {
        type: Number,
        required: true,
        min: [1, 'invalid month range'],
        max: [12, 'invalid month range'],
        default: new Date().getMonth() + 1,
      },
    },
  },
  { timestamps: true }
)

export const Budget = mongoose.model('budget', schema)
