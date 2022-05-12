import express from 'express';
import {
    replyComment,
    getReplyComment
} from '../controllers/replyController.js'
import {
    verifyToken,
} from '../middlewares/verifyToken.js';
const router = express.Router()
router.post('/:id', verifyToken, replyComment)
router.get('/:id', getReplyComment)
export default router