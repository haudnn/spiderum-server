import {
    PostModel
} from "../models/PostModel.js";
import { v2 as cloudinary } from 'cloudinary'
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find()
        .populate('author','userName')
        .populate('category','name')
        .select('title content description createdAt slug category attachment') ; 
        // populate('author') lấy toàn bộ thông tin của user có id match
        // populate('author','userName') lấy username từ author 
        // .select('-slug') // trừ field nào không muốn lấy
        res.status(200).json({
            status: 'OK',
            data: {
                posts
            }
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};
export const getPostsByCategory = async (req, res, next) => {
    const {cateId} = req.params
    try {
        const posts = await PostModel.find({
            category: cateId
        })
        .populate('author','userName')
        .populate('category','name')
        .select('title description createdAt slug category attachment') ; 
        res.status(200).json({
            status: 'OK',
            data: {
                posts
            }
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};
export const createPost = async (req, res, next) => {
    try {
        const {userId} = req.user
        const att = req.body.content.blocks.filter((url) =>{
            if(url.type === "image") {
              return url.data.file
            }
          })
          const url = att.map((e,i) => { 
              return e.data.file.url
          })
        const post = await PostModel.create({...req.body, author: userId ,attachment:url.toString()})
        res.status(200).json({
            status: 'OK',
            data:{post}
        })
    } catch (err) {
       next(err)
    }
};
export const updatePost = async (req, res, next) => {
    try {
        const {postId} = req.params
        const post = await PostModel.findByIdAndUpdate(postId, {...req.body} , {new: true, runValidator:true})
        res.status(200).json({
            status: 'OK',
            data:post
        })
    } catch (err) {
        next(err)
    }

};
export const deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params
        await PostModel.findByIdAndDelete(postId)
        res.status(200).json({
            status: 'OK',
            message:'Post has been delected'
        })
    } catch (err) {
        next(err)
    }
};
export const uploadImage = async (req, res, next) => {
    try {
        const fileStr = req.file;
        const uploadResponse = await cloudinary.uploader.upload(fileStr.path, {
            folder:"postimg"
        });
        res.status(200).json({
            "success" : "1",
            "file": {
                "url" : uploadResponse.url, 
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}
export const getPost = async (req, res, next) => {
    try {
        const post = await PostModel.findOne({slug: req.params.slug })
        .populate('author','userName')
        .populate('category')
        res.status(200).json({
            status: 'success',
            post: post
        })
    }catch (error) {
        res.json(error)
    }
};
  
