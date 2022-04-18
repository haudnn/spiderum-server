import express from 'express';
import { register, login,getCurrentUser } from '../controllers/authController.js'
import { checkCurrentUser } from '../middlewares/checkCurrentUser.js';
const router = express.Router()
router.post('/register', register)
router.post('/login' , login)
router.get('/',checkCurrentUser, getCurrentUser)

export default router