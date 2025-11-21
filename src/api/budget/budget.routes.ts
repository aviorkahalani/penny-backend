import { Router } from 'express'
import budgetController from './budget.controller'
import isAuthenticated from '../../middlewares/isAuthenticated'
import isOwner from '../../middlewares/isOwner'

const router = Router()

router
  .get('/', isAuthenticated, budgetController.fetchBudgets)
  .get('/current', isAuthenticated, budgetController.fetchCurrentBudget)
  .get('/:id', isAuthenticated, isOwner, budgetController.fetchBudgetById)
  .post('/', isAuthenticated, budgetController.createBudget)
  .put('/:id', isAuthenticated, isOwner, budgetController.updateBudget)
  .delete('/:id', isAuthenticated, isOwner, budgetController.deleteBudget)

export default router
