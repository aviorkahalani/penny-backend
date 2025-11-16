import { Router } from 'express'
import budgetController from './budget.controller'

const router = Router()

router
  .get('/', budgetController.fetchBudgets)
  .get('/current', budgetController.fetchCurrentBudget)
  .get('/:id', budgetController.fetchBudgetById)
  .post('/', budgetController.createBudget)
// .patch('/:id', budgetController.updateBudget)
// .delete('/:id', budgetController.deleteBudget)

export default router
