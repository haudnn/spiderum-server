import express from 'express';
import { register, login,getCurrentUser, createCategoryUser, deleteCategoryUser, updateUser } from '../controllers/authController.js'
import { checkCurrentUser } from '../middlewares/checkCurrentUser.js';
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router()
router.post('/register', register)
router.post('/login' , login)
router.put('/update/',verifyToken,updateUser)
router.put('/create/category/' ,verifyToken, createCategoryUser )
router.put('/delete/category/' ,verifyToken, deleteCategoryUser )
router.get('/',checkCurrentUser, getCurrentUser)
export default router