import { Types } from 'mongoose'
import { AppError } from '../../utils/AppError.js'
import { handler } from '../../utils/handler.js'
import { OK, UNAUTHORIZED } from '../../utils/http.js'
import dashboardService from './dashboard.service.js'

const getDashboardData = handler(async (req, res) => {
  const { userId } = req
  const { budgetId } = req.params

  if (!userId) throw new AppError(UNAUTHORIZED, 'unauthorized')

  const uid = new Types.ObjectId(userId)
  const bid = new Types.ObjectId(budgetId)

  const data = await dashboardService.getDashboardData({ userId: uid, budgetId: bid })

  return res.status(OK).json(data)
})

export default { getDashboardData }
