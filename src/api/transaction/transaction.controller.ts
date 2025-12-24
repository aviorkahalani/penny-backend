import { Types } from 'mongoose'
import { handler } from '../../utils/handler.js'
import { NO_CONTENT, OK, UNAUTHORIZED } from '../../utils/http.js'
import { AppError } from '../../utils/AppError.js'
import transactionService from './transaction.service.js'

const fetchTransactions = handler(async (req, res) => {
  const { budgetId } = req.params

  const bid = new Types.ObjectId(budgetId)

  const transactions = await transactionService.fetchTransactions(bid)
  res.status(OK).json(transactions)
})

const fetchTransactionById = handler(async (req, res) => {
  const { budgetId, transactionId } = req.params

  const bid = new Types.ObjectId(budgetId)
  const tid = new Types.ObjectId(transactionId)

  const transaction = await transactionService.fetchTransactionById(bid, tid)
  res.status(OK).json(transaction)
})

const createTransaction = handler(async (req, res) => {
  const { userId } = req
  const { budgetId } = req.params
  const { categoryId } = req.body

  if (!userId) throw new AppError(UNAUTHORIZED, 'unauthorized')

  const uid = new Types.ObjectId(userId)
  const bid = new Types.ObjectId(budgetId)
  const cid = new Types.ObjectId(categoryId)

  const data = { ...req.body, categoryId: cid }

  const transaction = await transactionService.createTransaction(uid, bid, data)
  res.status(OK).json(transaction)
})

const updateTransaction = handler(async (req, res) => {
  const { transactionId } = req.params

  const tid = new Types.ObjectId(transactionId)

  const transaction = await transactionService.updateTransaction(tid, req.body)
  res.status(OK).json(transaction)
})

const deleteTransaction = handler(async (req, res) => {
  const { transactionId } = req.params

  const tid = new Types.ObjectId(transactionId)

  await transactionService.deleteTransaction(tid)
  res.status(NO_CONTENT).json({})
})

export default {
  fetchTransactions,
  fetchTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
}
