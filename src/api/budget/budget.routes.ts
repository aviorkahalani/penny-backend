import { Router } from 'express'
import budgetController from './budget.controller'
import isAuthenticated from '../../middlewares/isAuthenticated'
import isOwner from '../../middlewares/isOwner'

const router = Router()

router
  .get('/', isAuthenticated, budgetController.fetchBudgets)
  .get('/current', isAuthenticated, budgetController.fetchCurrentBudget)
  .get('/:budgetId', isAuthenticated, isOwner, budgetController.fetchBudgetById)
  .post('/', isAuthenticated, budgetController.createBudget)
  .put('/:budgetId', isAuthenticated, isOwner, budgetController.updateBudget)
  .delete('/:budgetId', isAuthenticated, isOwner, budgetController.deleteBudget)

export default router
