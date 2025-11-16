import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { handler } from '../../utils/handler'
import { BAD_REQUEST, OK } from '../../utils/http'
import { AppError } from '../../utils/AppError'
import budgetService from './budget.service'

const fetchBudgets = handler(async (req: Request, res: Response) => {
  const budgets = await budgetService.fetchBudgets()
  res.status(OK).json(budgets)
})

const fetchCurrentBudget = handler(async (req: Request, res: Response) => {
  const budget = await budgetService.fetchCurrentBudget()
  res.status(OK).json(budget)
})

const fetchBudgetById = handler(async (req: Request, res: Response) => {
  const { id: budgetId } = req.params
  console.log({ budgetId })

  if (!mongoose.isValidObjectId(budgetId)) {
    throw new AppError(BAD_REQUEST, 'invalid id')
  }

  const id = new mongoose.Types.ObjectId(budgetId)
  const budget = await budgetService.fetchBudgetById(id)
  res.status(OK).json(budget)
})

const createBudget = handler(async (req: Request, res: Response) => {
  const body = req.body
  console.log({ body })

  res.status(OK).json({})
})

export default {
  fetchBudgets,
  fetchCurrentBudget,
  fetchBudgetById,
  createBudget,
}
