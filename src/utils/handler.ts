import { NextFunction, Request, Response } from 'express'

type Fn<T> = (req: Request, res: Response, next: NextFunction) => Promise<T>

export const handler = <T>(fn: Fn<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
