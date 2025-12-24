import { isValidObjectId, Types } from 'mongoose'
import { handler } from '../../utils/handler.js'
import { BAD_REQUEST, OK, UNAUTHORIZED } from '../../utils/http.js'
import { AppError } from '../../utils/AppError.js'
import categoryService from './category.service.js'

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

  const { type = '' } = req.query

  const id = new Types.ObjectId(req.userId)
  const bid = new Types.ObjectId(budgetId)

  const categories = await categoryService.fetchCategories(id, bid, type as string)
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

const fetchCategoryByType = handler(async (req, res) => {
  if (!req.userId) {
    throw new AppError(UNAUTHORIZED, 'unauthorized')
  }

  const { budgetId } = req.params
  if (!budgetId) {
    throw new AppError(BAD_REQUEST, 'missing budget id')
  }
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
