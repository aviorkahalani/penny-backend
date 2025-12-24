import { Router } from 'express'
import dashboardController from './dashboard.controller'
import isAuthenticated from '../../middlewares/isAuthenticated'
import isBudgetOwner from '../../middlewares/isBudgetOwner'

const router = Router()

router.get(
  '/:budgetId',
  isAuthenticated,
  isBudgetOwner,
  dashboardController.getDashboardData
)

export default router
