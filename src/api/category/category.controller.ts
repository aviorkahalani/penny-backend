import { isValidObjectId, Types } from 'mongoose'
import { handler } from '../../utils/handler'
import { BAD_REQUEST, OK, UNAUTHORIZED } from '../../utils/http'
import { AppError } from '../../utils/AppError'
import categoryService from './category.service'

interface PostReqBody {
  budgetId: string
  type: 'income' | 'expense' | 'saving'
  name: string
  plannedAmount: number
}

const fetchCategories = handler(async (req, res) => {
  if (!req.userId) {
    throw new AppError(UNAUTHORIZED, 'unauthorized')
  }

  const { budgetId } = req.params
  if (!budgetId) {
    throw new AppError(BAD_REQUEST, 'missing budget id')
  }

  const id = new Types.ObjectId(req.userId)
  const bid = new Types.ObjectId(budgetId)

  const categories = await categoryService.fetchCategories(id, bid)
  return res.status(OK).json(categories)
})

const fetchCategoryById = handler(async (req, res) => {
  const { categoryId } = req.params

  if (!isValidObjectId(categoryId)) {
    throw new AppError(BAD_REQUEST, 'invalid category id')
  }

  const id = new Types.ObjectId(categoryId)
  const category = await categoryService.fetchCategoryById(id)

  return res.status(OK).json(category)
})

const createCategory = handler(async (req, res) => {
  if (!req.userId) {
    throw new AppError(UNAUTHORIZED, 'unauthorized')
  }

  if (!isValidObjectId(req.userId)) {
    throw new AppError(BAD_REQUEST, 'invalid user id')
  }

  const { budgetId, name, type, plannedAmount } = req.body as PostReqBody
  const category = await categoryService.createCategory({
    userId: new Types.ObjectId(req.userId),
    budgetId: new Types.ObjectId(budgetId),
    name,
    type,
    plannedAmount,
  })

  return res.status(OK).json(category)
})

const updateCategory = handler(async (req, res) => {
  const { body } = req
  const { categoryId } = req.params

  if (!isValidObjectId(categoryId)) {
    throw new AppError(BAD_REQUEST, 'invalid category id')
  }

  const id = new Types.ObjectId(categoryId)
  const category = await categoryService.updateCategory(id, body)
  res.status(OK).json(category)
})

const deleteCategory = handler(async (req, res) => {
  const { categoryId } = req.params

  if (!isValidObjectId(categoryId)) {
    throw new AppError(BAD_REQUEST, 'invalid category id')
  }

  const id = new Types.ObjectId(categoryId)
  const category = await categoryService.deleteCategory(id)
  return res.status(OK).json(category)
})

export default {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}
