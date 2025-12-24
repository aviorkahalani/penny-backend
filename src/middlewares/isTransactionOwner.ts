import { isValidObjectId, Types } from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { UNAUTHORIZED, FORBIDDEN, BAD_REQUEST, NOT_FOUND } from '../utils/http.js'
import { handler } from '../utils/handler.js'
import { AppError } from '../utils/AppError.js'
import transactionService from '../api/transaction/transaction.service.js'

const isTransactionOwner = handler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { budgetId, transactionId } = req.params

    if (!req.userId) {
      throw new AppError(UNAUTHORIZED, 'unauthorized')
    }

    if (!isValidObjectId(budgetId) || !isValidObjectId(transactionId)) {
      throw new AppError(BAD_REQUEST, 'invalid type of id')
    }

    const bid = new Types.ObjectId(budgetId)
    const tid = new Types.ObjectId(transactionId)
    const transaction = await transactionService.fetchTransactionById(bid, tid)

    if (!transaction) {
      throw new AppError(NOT_FOUND, 'cannot find transaction')
    }

    if (!transaction.userId.equals(new Types.ObjectId(req.userId))) {
      throw new AppError(FORBIDDEN, 'you are not the owner')
    }

    next()
  }
)

export default isTransactionOwner
