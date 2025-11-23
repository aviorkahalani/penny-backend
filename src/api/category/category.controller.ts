import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { handler } from '../../utils/handler'
import { BAD_REQUEST, OK, UNAUTHORIZED } from '../../utils/http'
import { AppError } from '../../utils/AppError'

const fetchCategories = handler(async (req: Request, res: Response) => {
  const categories = await categoryService.fetchCategories()
  return categories
})

export default {
  fetchCategories,
}
