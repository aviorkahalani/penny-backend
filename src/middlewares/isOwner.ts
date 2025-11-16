import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { UNAUTHORIZED, FORBIDDEN, BAD_REQUEST } from '../utils/http'
import { handler } from '../utils/handler'
import { AppError } from '../utils/AppError'
import budgetService from '../api/budget/budget.service'

const isOwner = handler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: budgetId } = req.params
    const userId = req.userId

    if (!userId) {
      throw new AppError(UNAUTHORIZED, 'unauthorized')
    }

    if (!mongoose.isValidObjectId(budgetId)) {
      throw new AppError(BAD_REQUEST, 'invalid type of id')
    }

    const id = new mongoose.Types.ObjectId(budgetId)
    const budget = await budgetService.fetchBudgetById(id)

    if (budget.userId !== new mongoose.Types.ObjectId(userId)) {
      throw new AppError(FORBIDDEN, 'you are not the owner')
    }

    next()
  }
)

export default isOwner
