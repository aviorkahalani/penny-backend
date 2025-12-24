import { Types } from 'mongoose'
import { ITransaction, Transaction } from '../../db/models/transaction.js'

const fetchTransactions = async (bid: Types.ObjectId) => {
  return await Transaction.find({ budgetId: bid }).sort({ date: -1 })
}

const fetchTransactionById = async (bid: Types.ObjectId, tid: Types.ObjectId) => {
  return await Transaction.findOne({ budgetId: bid, _id: tid })
}

const createTransaction = async (
  uid: Types.ObjectId,
  bid: Types.ObjectId,
  body: Partial<ITransaction>
) => {
  const transaction = new Transaction({ userId: uid, budgetId: bid, ...body })
  await transaction.save()

  return transaction
}

const updateTransaction = async (tid: Types.ObjectId, body: Partial<ITransaction>) => {
  return await Transaction.findByIdAndUpdate(tid, body, { new: true })
}

const deleteTransaction = async (tid: Types.ObjectId) => {
  return await Transaction.findByIdAndDelete(tid)
}

export default {
  fetchTransactions,
  fetchTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
}
