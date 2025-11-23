import { Router } from 'express'
import categoryController from './category.controller'
import isAuthenticated from '../../middlewares/isAuthenticated'
import isCategoryOwner from '../../middlewares/isCategoryOwner'

const router = Router()

router
  .get('/', categoryController.fetchCategories)
  .get(
    '/:id',
    isAuthenticated,
    isCategoryOwner,
    categoryController.fetchCategoryById
  )
  .post('/:budgetId', isAuthenticated, categoryController.createCategory)
  .put(
    '/:id',
    isAuthenticated,
    isCategoryOwner,
    categoryController.updateCategory
  )
  .delete(
    '/:id',
    isAuthenticated,
    isCategoryOwner,
    categoryController.deleteCategory
  )

export default router
