import {
    PostModel
} from "../models/PostModel.js";
export const getPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find().populate('author'); // lấy toàn bộ thông tin của user có id match
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
        res.status(500).json({
            error: err,
        });
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
        res.status(500).json({
            error: err,
        });
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
        const {postId} = req.params
        await PostModel.findByIdAndDelete(postId)
        res.status(200).json({
            status: 'OK',
            message:'Post has been delected'
        })
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};