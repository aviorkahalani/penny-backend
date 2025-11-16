import mongoose, { Schema, Types } from 'mongoose'

interface IBudget {
  userId: Types.ObjectId
  date: {
    year: number
    month: number
  }
  currency: 'NIS' | 'USD'
  notes: string
}

const schema = new Schema<IBudget>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    date: {
      year: { type: Number, required: true },
      month: { type: Number, required: true, min: 1, max: 12 },
    },
    currency: {
      type: String,
      default: 'NIS',
    },
    notes: {
      type: String,
      maxLength: 120,
    },
  },
  { timestamps: true }
)

export const Budget = mongoose.model('budget', schema)
