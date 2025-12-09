import { Router } from 'express'
import budgetController from './budget.controller'
import isAuthenticated from '../../middlewares/isAuthenticated'
import isBudgetOwner from '../../middlewares/isBudgetOwner'

const router = Router()

router
  .get('/', isAuthenticated, budgetController.fetchBudgets)
  .get('/current', isAuthenticated, budgetController.fetchCurrentBudget)
  .get('/:budgetId', isAuthenticated, isBudgetOwner, budgetController.fetchBudgetById)
  .post('/', isAuthenticated, budgetController.createBudget)
  .put('/:budgetId', isAuthenticated, isBudgetOwner, budgetController.updateBudget)
  .delete('/:budgetId', isAuthenticated, isBudgetOwner, budgetController.deleteBudget)

export default router
