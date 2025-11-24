import { isValidObjectId, Types } from 'mongoose'
import { Request, Response } from 'express'
import { handler } from '../../utils/handler'
import { BAD_REQUEST, OK, UNAUTHORIZED } from '../../utils/http'
import { AppError } from '../../utils/AppError'
import budgetService from './budget.service'

const fetchBudgets = handler(async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new AppError(UNAUTHORIZED, 'unauthorized')
  }

  const budgets = await budgetService.fetchBudgets(req.userId)
  res.status(OK).json(budgets)
})

const fetchCurrentBudget = handler(async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new AppError(UNAUTHORIZED, 'unauthorized')
  }

  const budget = await budgetService.fetchCurrentBudget(req.userId)
  res.status(OK).json(budget)
})

const fetchBudgetById = handler(async (req: Request, res: Response) => {
  const { budgetId } = req.params

  if (!isValidObjectId(budgetId)) {
    throw new AppError(BAD_REQUEST, 'invalid id')
  }

  const id = new Types.ObjectId(budgetId)
  const budget = await budgetService.fetchBudgetById(id)
  res.status(OK).json(budget)
})

const createBudget = handler(async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new AppError(UNAUTHORIZED, 'user must be logged in')
  }

  const data = { userId: req.userId, ...req.body }
  const budget = await budgetService.createBudget(data)
  res.status(OK).json(budget)
})

const updateBudget = handler(async (req: Request, res: Response) => {
  const { body } = req
  const { budgetId } = req.params

  if (!isValidObjectId(budgetId)) {
    throw new AppError(BAD_REQUEST, 'invalid id')
  }

  const id = new Types.ObjectId(budgetId)
  const budget = await budgetService.updateBudget(id, body)
  res.status(OK).json(budget)
})

const deleteBudget = handler(async (req: Request, res: Response) => {
  const { budgetId } = req.params

  if (!isValidObjectId(budgetId)) {
    throw new AppError(BAD_REQUEST, 'invalid id')
  }

  const id = new Types.ObjectId(budgetId)
  const budget = await budgetService.deleteBudget(id)
  res.status(OK).json(budget)
})

export default {
  fetchBudgets,
  fetchCurrentBudget,
  fetchBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
}
