import express from 'express';
import {  getAllPosts, createPost,updatePost, deletePost, uploadImage, getPost,getPostsByCategory } from '../controllers/postController.js'
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload}  from '../middlewares/multers.js'
const router = express.Router()
router.put('/:postId', verifyToken,updatePost)
router.delete('/:postId',verifyToken,deletePost)
router.get('/',getAllPosts)
router.get('/:slug',getPost)
router.get('/cate/:cateId' ,getPostsByCategory )
router.post('/',verifyToken,createPost)
router.post('/upload',upload.single('file'),uploadImage)
export default router