import { Types } from 'mongoose'
import { Budget, IBudget } from '../../db/models/budget'
import { AppError } from '../../utils/AppError'
import { BAD_REQUEST, NOT_FOUND } from '../../utils/http'

const fetchBudgets = async (userId: string) => {
  const budgets = await Budget.find({ userId })
  if (!budgets || !budgets.length) {
    throw new AppError(NOT_FOUND, 'could not find budgets')
  }

  return budgets
}

const fetchCurrentBudget = async (userId: string) => {
  const date = new Date()
  const [year, month] = [date.getFullYear(), date.getUTCMonth() + 1]

  const budget = await Budget.findOne({ userId, date: { year, month } })
  if (!budget) {
    throw new AppError(NOT_FOUND, 'could not find current budget')
  }

  return budget
}

const fetchBudgetById = async (id: Types.ObjectId) => {
  const budget = await Budget.findById(id)

  if (!budget) {
    throw new AppError(NOT_FOUND, 'could not find current budget')
  }

  return budget
}

const createBudget = async (data: IBudget) => {
  const budget = new Budget(data)
  await budget.save()

  return budget
}

const deleteBudget = async (id: Types.ObjectId) => {
  return await Budget.findByIdAndDelete(id)
}

export default {
  fetchBudgets,
  fetchCurrentBudget,
  fetchBudgetById,
  createBudget,
  deleteBudget,
}
