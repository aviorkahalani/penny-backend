import mongoose, { Schema, Types } from 'mongoose'

export interface IBudget {
  userId: Types.ObjectId
  date: {
    year: number
    month: number
  }
  currency: 'NIS' | 'USD'
  notes?: string
}

const schema = new Schema<IBudget>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
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
    currency: {
      type: String,
      default: 'NIS',
    },
    notes: {
      type: String,
      maxLength: 240,
    },
  },
  { timestamps: true }
)

export const Budget = mongoose.model('budget', schema)
