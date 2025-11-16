import { Types } from 'mongoose'
import { Budget } from '../../db/models/budget'
import { AppError } from '../../utils/AppError'
import { NOT_FOUND } from '../../utils/http'

const fetchBudgets = async () => {
  const budgets = await Budget.find()
  if (!budgets || !budgets.length) {
    throw new AppError(NOT_FOUND, 'could not find budgets')
  }

  return budgets
}

const fetchCurrentBudget = async () => {
  const date = new Date()
  const [year, month] = [date.getFullYear(), date.getMonth()]

  const budget = await Budget.findOne({ date: { year, month } })
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

const createBudget = async () => {}

export default {
  fetchBudgets,
  fetchCurrentBudget,
  fetchBudgetById,
}
