import express from 'express';
import { getAllComments, createComment, deleteComment } from '../controllers/commentController.js'
import {
    verifyToken,
} from '../middlewares/verifyToken.js';
const router = express.Router()
router.get('/', getAllComments)
router.post('/create',  verifyToken,createComment)
router.post('/delete', verifyToken,deleteComment)
export default router