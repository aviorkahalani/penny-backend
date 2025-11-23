import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { UNAUTHORIZED, FORBIDDEN, BAD_REQUEST, NOT_FOUND } from '../utils/http'
import { handler } from '../utils/handler'
import { AppError } from '../utils/AppError'
import categoryService from '../api/category/category.service'

const isCategoryOwner = handler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: categoryId } = req.params
    const userId = req.userId

    if (!userId) {
      throw new AppError(UNAUTHORIZED, 'unauthorized')
    }

    if (!mongoose.isValidObjectId(categoryId)) {
      throw new AppError(BAD_REQUEST, 'invalid type of id')
    }

    const id = new mongoose.Types.ObjectId(categoryId)
    const category = await categoryService.fetchCategoryById(id)

    if (!category) {
      throw new AppError(NOT_FOUND, 'cannot find category')
    }

    if (!category.userId.equals(new mongoose.Types.ObjectId(userId))) {
      throw new AppError(FORBIDDEN, 'you are not the owner')
    }

    next()
  }
)

export default isCategoryOwner
