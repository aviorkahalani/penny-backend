import { Router } from 'express'
import transactionsController from './transaction.controller'
import isAuthenticated from '../../middlewares/isAuthenticated'
import isBudgetOwner from '../../middlewares/isBudgetOwner'
import isTransactionOwner from '../../middlewares/isTransactionOwner'

const router = Router()

router
  .get(
    '/:budgetId',
    isAuthenticated,
    isBudgetOwner,
    transactionsController.fetchTransactions
  )
  .get(
    '/:budgetId/:transactionId',
    isAuthenticated,
    isBudgetOwner,
    transactionsController.fetchTransactionById
  )
  .post(
    '/:budgetId',
    isAuthenticated,
    isBudgetOwner,
    transactionsController.createTransaction
  )
  .put(
    '/:budgetId/:transactionId',
    isAuthenticated,
    isBudgetOwner,
    isTransactionOwner,
    transactionsController.updateTransaction
  )
  .delete(
    '/:budgetId/:transactionId',
    isAuthenticated,
    isBudgetOwner,
    isTransactionOwner,
    transactionsController.deleteTransaction
  )

export default router
