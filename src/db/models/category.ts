import mongoose, { Schema, Types } from 'mongoose'

export interface ICategory {
  userId: Types.ObjectId
  budgetId: Types.ObjectId
  type: 'income' | 'expense' | 'saving'
  name: string
  plannedAmount: number
  createdAt: Date
  updatedAt: Date
}

const schema = new Schema<ICategory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    budgetId: {
      type: 'ObjectID',
      ref: 'Budget',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    plannedAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

schema.index({ userId: 1, budgetId: 1, type: 1 })

export const Category = mongoose.model('Category', schema)
