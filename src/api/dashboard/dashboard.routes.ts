import { Router } from 'express'
import dashboardController from './dashboard.controller.js'
import isAuthenticated from '../../middlewares/isAuthenticated.js'
import isBudgetOwner from '../../middlewares/isBudgetOwner.js'

const router = Router()

router.get(
  '/:budgetId',
  isAuthenticated,
  isBudgetOwner,
  dashboardController.getDashboardData
)

export default router
