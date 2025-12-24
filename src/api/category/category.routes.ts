import { Router } from 'express'
import categoryController from './category.controller.js'
import isAuthenticated from '../../middlewares/isAuthenticated.js'
import isCategoryOwner from '../../middlewares/isCategoryOwner.js'

const router = Router()

router
  .get('/:budgetId', isAuthenticated, categoryController.fetchCategories)
  .get(
    '/:categoryId',
    isAuthenticated,
    isCategoryOwner,
    categoryController.fetchCategoryById
  )
  .post('/', isAuthenticated, categoryController.createCategory)
  .put(
    '/:categoryId',
    isAuthenticated,
    isCategoryOwner,
    categoryController.updateCategory
  )
  .delete(
    '/:categoryId',
    isAuthenticated,
    isCategoryOwner,
    categoryController.deleteCategory
  )

export default router
