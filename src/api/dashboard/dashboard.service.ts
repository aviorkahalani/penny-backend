import { Transaction } from '../../db/models/transaction'
import { Types } from 'mongoose'

interface Args {
  userId: Types.ObjectId
  budgetId: Types.ObjectId
}

const getDashboardData = async (args: Args) => {
  const [summary, spentByCategory] = await Promise.all([
    _getBudgetSummary(args),
    _getSpentPerCategory(args),
  ])

  return { summary, spentByCategory }
}

const _getBudgetSummary = async (args: Args) => {
  const rows = await Transaction.aggregate([
    { $match: { userId: args.userId, budgetId: args.budgetId } },
    {
      $group: {
        _id: null,
        income: { $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] } },
        expense: { $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] } },
        saving: { $sum: { $cond: [{ $eq: ['$type', 'saving'] }, '$amount', 0] } },
      },
    },
    {
      $project: {
        _id: 0,
        income: 1,
        expense: 1,
        saving: 1,
        net: { $subtract: ['$income', { $add: ['$expense', '$saving'] }] },
      },
    },
  ])

  return rows[0] ?? { income: 0, expense: 0, saving: 0, net: 0 }
}

const _getSpentPerCategory = async (args: Args) => {
  return Transaction.aggregate([
    {
      $match: { userId: args.userId, budgetId: args.budgetId, type: 'expense' as const },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: '$category' },

    { $match: { 'category.type': 'expense' } },

    {
      $group: {
        _id: '$categoryId',
        name: { $first: '$category.name' },
        plannedAmount: { $first: '$category.plannedAmount' },
        spent: { $sum: '$amount' },
        txCount: { $sum: 1 },
      },
    },
    { $sort: { spent: -1 } },
    {
      $project: {
        _id: 0,
        categoryId: '$_id',
        name: 1,
        plannedAmount: 1,
        spent: 1,
        txCount: 1,
        remaining: { $subtract: ['$plannedAmount', '$spent'] },
        progress: {
          $cond: [
            { $gt: ['$plannedAmount', 0] },
            { $divide: ['$spent', '$plannedAmount'] },
            null,
          ],
        },
      },
    },
  ])
}

export default { getDashboardData }
