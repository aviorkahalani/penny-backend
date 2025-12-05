import { Router } from 'express'
import categoryController from './category.controller'
import isAuthenticated from '../../middlewares/isAuthenticated'
import isCategoryOwner from '../../middlewares/isCategoryOwner'

const router = Router()

router
  .get('/:budgetId', isAuthenticated, categoryController.fetchCategories)
  .get('/:categoryId', isAuthenticated, isCategoryOwner, categoryController.fetchCategoryById)
  .post('/', isAuthenticated, categoryController.createCategory)
  .put('/:categoryId', isAuthenticated, isCategoryOwner, categoryController.updateCategory)
  .delete('/:categoryId', isAuthenticated, isCategoryOwner, categoryController.deleteCategory)

export default router
