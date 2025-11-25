import { Types } from 'mongoose'
import { Category, ICategory } from '../../db/models/category'

const fetchCategories = async (
  userId: Types.ObjectId,
  budgetId: Types.ObjectId
) => {
  return await Category.find({ userId, budgetId })
}

const fetchCategoryById = async (id: Types.ObjectId) => {
  return await Category.findById(id)
}

const createCategory = async (data: Partial<ICategory>) => {
  const category = new Category(data)
  await category.save()

  return category
}

const updateCategory = async (id: Types.ObjectId, data: Partial<ICategory>) => {
  return await Category.findByIdAndUpdate(id, data, { new: true })
}

const deleteCategory = async (id: Types.ObjectId) => {
  return await Category.findByIdAndDelete(id)
}

export default {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}
