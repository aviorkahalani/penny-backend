import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError'
import { INTERNAL_SERVER_ERROR } from '../utils/http'

const DEFAULT_ERR_MSG = 'something went wrong.'

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error)

  if (error instanceof AppError) {
    const { message, code } = error

    return res.status(code).json({ message, code })
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ error: DEFAULT_ERR_MSG })
}

export default errorHandler
