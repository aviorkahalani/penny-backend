import { Types } from 'mongoose'
import { AppError } from '../../utils/AppError'
import { handler } from '../../utils/handler'
import { OK, UNAUTHORIZED } from '../../utils/http'
import dashboardService from './dashboard.service'

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
