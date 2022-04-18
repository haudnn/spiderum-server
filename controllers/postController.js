import {
    PostModel
} from "../models/PostModel.js";
import { v2 as cloudinary } from 'cloudinary'
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find().populate('author','userName').select('title content description createdAt slug') ; 
        // populate('author') lấy toàn bộ thông tin của user có id match
        // populate('author','userName') lấy username từ author 
        // .select('-slug') // trừ field nào không muốn lấy
        res.status(200).json({
            status: 'OK',
            result: posts.length,
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
    // try {
    //     const newPost = req.body;
    //     const post = new PostModel(newPost);
    //     await post.save();
    //     res.status(200).json(post);
    // } catch (err) {
    //     res.status(500).json({
    //         error: err,
    //     });
    // }
    try {
        const {userId} = req.user
        const post = await PostModel.create({...req.body, author: userId})
        res.status(200).json({
            status: 'OK',
            data:{post}
        })
    } catch (err) {
       next(err)
    }
};
export const updatePost = async (req, res, next) => {
    // try {
        
    //     const updatePost = req.body;
    //     const post = await PostModel.findOneAndUpdate({
    //             _id: updatePost._id,
    //         },
    //         updatePost, {
    //             new: true
    //         }
    //     );
    //     res.status(200).json(post);
    // } catch (err) {
    //     res.status(500).json({
    //         error: err,
    //     });
    // }
    try {
        const {postId} = req.params
        const post = await PostModel.findByIdAndUpdate(postId, {...req.body} , {new: true, runValidator:true})
        res.status(200).json({
            status: 'OK',
            data:{post}
        })
    } catch (err) {
        next(err)
    }

};
export const deletePost = async (req, res, next) => {
    // try {
    //     const updatePost = req.body;
    //     const post = await PostModel.findOneAndUpdate({
    //             _id: updatePost._id,
    //         },
    //         updatePost, {
    //             new: true
    //         }
    //     );
    //     res.status(200).json(post);
    // } catch (err) {
    //     res.status(500).json({
    //         error: err,
    //     });
    // }
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
        // const data =  { post: null }
        const post = await PostModel.findOne({slug: req.params.slug });
        // data.post  = {
        //     userName: user.userName,
        //     displayName: user.displayName,
        //     mobile:user.mobile,
        //     followers: user.followers,
        //     following: user.following,
        //     intro: user.intro,
        //     avatar: user.avatar,
        //     isVerified: user.isVerified,
        // }
        res.status(200).json({
            status: 'success',
            post: post
        })
    }catch (error) {
        res.json(error)
    }
};
  
