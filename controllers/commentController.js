import { CommentsModel } from "../models/CommentsModel.js";
export const getAllComments = async (req, res, next) => {
    try {
        const comments = await CommentsModel.find()
        .populate('author','userName avatar displayName')
        .populate('post','_id')
        res.status(200).json({
            status: 'OK',
            data: {
                comments
            }
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};
export const createComment = async (req, res, next) => {
    const {userId} = req.user
    const postId = req.body.postId
    try {
        const comment = await CommentsModel.create({...req.body, author: userId,post:postId})
        res.status(200).json({
            status: 'OK',
            data:{
                comment
            }
        })
    } catch (err) {
        next(err)
    }
};
export const deleteComment = async (req, res, next) => {
    const { commentId } = req.body.commentId
    try {
        
        await CommentsModel.findByIdAndDelete(commentId)
        res.status(200).json({
            status: 'OK',
            message:'Bình luận đã được xóa thành công'
        })
    } catch (err) {
        next(err)
    }
};

export const votePost = async (req, res, next) => {
    console.log(req.body.postId)
    try {
        const {userId} = req.user
        const find =  await PostModel.find({
            _id : { $in: req.body.postId },
            voteCount : { $in: userId }
        })
        console.log(find)
        if(find.length === 0){
            const data = await PostModel.findOneAndUpdate({_id:req.body.postId
            }, {
                $push: {
                    voteCount:userId
                }
            }, {
                new: true
            })
            res.status(200).json({
                status: '1',
                data: data,
            })
        }
        else if (find.length !== 0){
            const data = await PostModel.findOneAndUpdate({
                _id:req.body.postId
            }, {
                $pull: {
                    voteCount: userId
                }
            }, {
                new: true
            })
            res.status(200).json({
                status: 'OK',
                data: data,
            })
        }

    } catch (err) {
        next(err)
    }
};

