import { PostModel } from "../models/PostModel.js";
export const getPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find().populate('author');
        // res.status(200).json(posts);
        res.status(200).json({
            status : 'OK',
            result: posts.length,
            data:{posts}
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};
export const createPost = async (req, res, next) => {
    try {
        const newPost = req.body;
        console.log(newPost)
        const post = new PostModel(newPost);
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};
export const updatePost = async (req, res, next) => {
    try {
        const updatePost = req.body;
        const post = await PostModel.findOneAndUpdate(
            {_id: updatePost._id,},
            updatePost, 
            { new: true}
        );
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};
export const deletePost = async (req, res, next) => {
    try {
        const updatePost = req.body;
        const post = await PostModel.findOneAndUpdate(
            {_id: updatePost._id,},
            updatePost, 
            { new: true}
        );
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};