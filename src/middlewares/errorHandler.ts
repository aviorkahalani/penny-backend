import { Request, Response, NextFunction } from 'express'
import { Error, MongooseError } from 'mongoose'
import { AppError } from '../utils/AppError.js'
import { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR } from '../utils/http.js'

interface ErrorResponse {
  success: boolean
  code: number
  message: string
  details?: { path: string; message: string }[]
}

const VALIDATION_ERR_MSG = 'validation failed'
const DEFAULT_ERR_MSG = 'something went wrong.'

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response: ErrorResponse = {
    success: false,
    code: INTERNAL_SERVER_ERROR,
    message: DEFAULT_ERR_MSG,
  }

  if (error instanceof AppError) {
    response.code = error.code
    response.message = error.message
  }

  if (error instanceof MongooseError) {
    response.code = CONFLICT
    response.details = [{ path: 'email', message: error.message }]
  }

  if (error instanceof Error.ValidationError) {
    const errors = Object.values(error.errors)

    response.code = BAD_REQUEST
    response.message = VALIDATION_ERR_MSG
    response.details = errors.map(({ path, message }) => ({ path, message }))
  }

  return res.status(response.code).json(response)
}

export default errorHandler
