import { isValidObjectId, Types } from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { UNAUTHORIZED, FORBIDDEN, BAD_REQUEST, NOT_FOUND } from '../utils/http.js'
import { handler } from '../utils/handler.js'
import { AppError } from '../utils/AppError.js'
import categoryService from '../api/category/category.service.js'

const isCategoryOwner = handler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params

    if (!req.userId) {
      throw new AppError(UNAUTHORIZED, 'unauthorized')
    }

    if (!isValidObjectId(categoryId)) {
      throw new AppError(BAD_REQUEST, 'invalid type of id')
    }

    const id = new Types.ObjectId(categoryId)
    const category = await categoryService.fetchCategoryById(id)

    if (!category) {
      throw new AppError(NOT_FOUND, 'cannot find category')
    }

    if (!category.userId.equals(new Types.ObjectId(req.userId))) {
      throw new AppError(FORBIDDEN, 'you are not the owner')
    }

    next()
  }
)

export default isCategoryOwner
