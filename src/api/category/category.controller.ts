import mongoose from 'mongoose'
import { handler } from '../../utils/handler'
import { BAD_REQUEST, OK, UNAUTHORIZED } from '../../utils/http'
import { AppError } from '../../utils/AppError'
import categoryService from './category.service'

interface PostReqBody {
  type: 'income' | 'expense' | 'saving'
  name: string
  plannedAmount: number
}

const fetchCategories = handler(async (req, res) => {
  const categories = await categoryService.fetchCategories()
  return res.status(OK).json(categories)
})

const fetchCategoryById = handler(async (req, res) => {
  const { id: categoryId } = req.params

  if (!mongoose.isValidObjectId(categoryId)) {
    throw new AppError(BAD_REQUEST, 'invalid id')
  }
  const id = new mongoose.Types.ObjectId(categoryId)
  const category = await categoryService.fetchCategoryById(id)

  return res.status(OK).json(category)
})

const createCategory = handler(async (req, res) => {
  const userId = req.userId
  if (!userId) {
    throw new AppError(UNAUTHORIZED, 'unauthorized')
  }

  if (!mongoose.isValidObjectId(userId)) {
    throw new AppError(BAD_REQUEST, 'invalid user id')
  }

  const { budgetId } = req.params
  if (!budgetId) {
    throw new AppError(BAD_REQUEST, 'missing budget id')
  }

  if (!mongoose.isValidObjectId(budgetId)) {
    throw new AppError(BAD_REQUEST, 'invalid budget id')
  }

  const body = req.body as PostReqBody

  const uid = new mongoose.Types.ObjectId(userId)
  const bid = new mongoose.Types.ObjectId(budgetId)
  const category = await categoryService.createCategory({
    userId: uid,
    budgetId: bid,
    ...body,
  })

  res.status(OK).json(category)
})

const updateCategory = handler(async (req, res) => {
  const { body } = req
  const { id: categorytId } = req.params

  if (!mongoose.isValidObjectId(categorytId)) {
    throw new AppError(BAD_REQUEST, 'invalid id')
  }

  const id = new mongoose.Types.ObjectId(categorytId)
  const category = await categoryService.updateCategory(id, body)
  res.status(OK).json(category)
})

const deleteCategory = handler(async (req, res) => {
  const { id: categoryId } = req.params

  if (!mongoose.isValidObjectId(categoryId)) {
    throw new AppError(BAD_REQUEST, 'invalid id')
  }
  const id = new mongoose.Types.ObjectId(categoryId)
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
