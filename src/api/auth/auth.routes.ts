import { Router } from 'express'
import authController from './auth.controller'
import isAuthenticated from '../../middlewares/isAuthenticated'

const router = Router()

router
  .get('/', isAuthenticated)
  .get('/me', isAuthenticated, authController.me)
  .post('/register', authController.register)
  .post('/login', authController.login)
  .post('/logout', authController.logout)

export default router
