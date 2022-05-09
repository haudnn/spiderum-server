import express from 'express';
import {
    register,
    login,
    getCurrentUser,
    getUser,
    createCategoryUser,
    deleteCategoryUser,
    updateUser,
    updateUserEmail,
    updatePassword,
    updateFollower,
    updateUnFollower, 
    authFacebook,
    authMail,
    confirmEmail
} from '../controllers/authController.js'
import {
    checkCurrentUser
} from '../middlewares/checkCurrentUser.js';
import {
    verifyToken,
} from '../middlewares/verifyToken.js';
import {
    verifyTokenRegister
} from '../middlewares/verifyTokenRegister.js'
const router = express.Router()
router.post('/register',  verifyTokenRegister,register)
router.post('/facebook/', authFacebook)
router.post('/mail/' ,authMail)
router.post('/mail/confirm/:id' , confirmEmail)
router.post('/login', login)
router.put('/update/', verifyToken, updateUser)
router.put('/update/email', verifyToken, updateUserEmail)
router.put('/update/follower/',verifyToken, updateFollower)
router.put('/update/unfollower/',verifyToken, updateUnFollower)
router.put('/password/', verifyToken, updatePassword)
router.put('/create/category/', verifyToken, createCategoryUser)
router.put('/delete/category/', verifyToken, deleteCategoryUser)
router.get('/:username', getUser)
router.get('/', checkCurrentUser, getCurrentUser)
export default router