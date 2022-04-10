import express from 'express';
import { getPosts, createPost,updatePost, deletePost } from '../controllers/postController.js'
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router()
router.put('/:postId', updatePost)
router.delete('/:postId', deletePost)
router.get('/' , getPosts)
router.post('/',verifyToken,createPost)
export default router