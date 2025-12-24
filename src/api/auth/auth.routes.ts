import { Router } from 'express'
import authController from './auth.controller.js'
import isAuthenticated from '../../middlewares/isAuthenticated.js'

const router = Router()

router
  .get('/', isAuthenticated)
  .get('/me', isAuthenticated, authController.me)
  .post('/register', authController.register)
  .post('/login', authController.login)
  .post('/logout', authController.logout)

export default router
