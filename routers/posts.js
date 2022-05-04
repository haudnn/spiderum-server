import express from 'express';
import {  getAllPosts, createPost,updatePost, deletePost, uploadImage, getPost,getPostsByCategory, getPostsByUserName } from '../controllers/postController.js'
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload}  from '../middlewares/multers.js'
const router = express.Router()
router.put('/:postId', verifyToken,updatePost)
router.delete('/:postId',verifyToken,deletePost)
router.get('/:slug',getPost)
router.get('/user/:username',getPostsByUserName)
router.get('/cate/:cateId' ,getPostsByCategory )
router.post('/upload',upload.single('file'),uploadImage)
router.post('/',verifyToken,createPost)
router.get('/',getAllPosts)

export default router