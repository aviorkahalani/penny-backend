import { Router } from 'express'
import authController from './auth.controller'

const router = Router()

router
  .get('/me', authController.me)
  .post('/register', authController.register)
  .post('/login', authController.login)
  .post('/logout', authController.logout)

export default router
