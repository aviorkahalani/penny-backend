import { Router } from 'express'
import categoryController from './category.controller'

const router = Router()

router.get('/', categoryController.fetchCategories)
// .get('/:id', categoryController.fetchCategoryById)
// .get('/?type=*', categoryController.fetchCategoriesByType)
// .post('/', categoryController.createCategory)
// .put('/:id', categoryController.updateCategory)
// .delete('/:id', categoryController.deleteCategory)

export default router
