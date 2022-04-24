import express from 'express';
import { register, login,getCurrentUser, createCategoryUser, deleteCategoryUser } from '../controllers/authController.js'
import { checkCurrentUser } from '../middlewares/checkCurrentUser.js';
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router()
router.post('/register', register)
router.post('/login' , login)
router.get('/',checkCurrentUser, getCurrentUser)
router.put('/create/category/' ,verifyToken, createCategoryUser )
router.put('/delete/category/' ,verifyToken, deleteCategoryUser )
export default router