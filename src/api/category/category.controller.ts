import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { handler } from '../../utils/handler'
import { BAD_REQUEST, OK, UNAUTHORIZED } from '../../utils/http'
import { AppError } from '../../utils/AppError'
import categoryService from './category.service'

const fetchCategories = handler(async (req: Request, res: Response) => {
  const categories = await categoryService.fetchCategories()
  return res.status(OK).json(categories)
})

export default {
  fetchCategories,
}
