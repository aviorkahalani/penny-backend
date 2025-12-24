import { isValidObjectId, Types } from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { UNAUTHORIZED, FORBIDDEN, BAD_REQUEST } from '../utils/http.js'
import { handler } from '../utils/handler.js'
import { AppError } from '../utils/AppError.js'
import budgetService from '../api/budget/budget.service.js'

const isOwner = handler(async (req: Request, res: Response, next: NextFunction) => {
  const { budgetId } = req.params

  if (!req.userId) {
    throw new AppError(UNAUTHORIZED, 'unauthorized')
  }

  if (!isValidObjectId(budgetId)) {
    throw new AppError(BAD_REQUEST, 'invalid type of id')
  }

  const id = new Types.ObjectId(budgetId)
  const budget = await budgetService.fetchBudgetById(id)

  if (!budget.userId.equals(new Types.ObjectId(req.userId))) {
    throw new AppError(FORBIDDEN, 'you are not the owner')
  }

  next()
})

export default isOwner
