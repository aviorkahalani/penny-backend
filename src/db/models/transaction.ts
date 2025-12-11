import mongoose, { Schema, Types } from 'mongoose'

export interface ITransaction {
  userId: Types.ObjectId
  budgetId: Types.ObjectId
  type: 'income' | 'expense' | 'saving'
  description?: string
  amount: number
  date: Date
  createdAt: Date
  updatedAt: Date
}

const schema = new Schema<ITransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    budgetId: { type: Schema.Types.ObjectId, ref: 'Budget', required: true },
    type: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, default: 0 },
    date: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
)

export const Transaction = mongoose.model('Transaction', schema)
