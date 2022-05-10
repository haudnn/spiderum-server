import {
    PostModel,
} from "../models/PostModel.js";
import {
    UserModel
} from "../models/UserModel.js";
import { v2 as cloudinary } from 'cloudinary'
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find()
        .populate('author','userName avatar displayName')
        .populate('category','name slug')
        .select('title content description createdAt slug category attachment ') ; 
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
        .populate('author','userName avatar displayName' )
        .populate('category','name slug')
        .select('title description createdAt slug category attachment ') ; 
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
export const getPostsByUserName = async (req, res, next) => {
    const {username} = req.params
    const user = await UserModel.find({
        userName: username
    })
   const userId= user[0]._id.toString()
    try {
        const posts = await PostModel.find({
            author: userId
        })
        .populate('author','userName avatar')
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
        if(req.body.title.length < 10 ){
            res.status(500).json({
                err:"Tiêu đề bài viết không được để trống và phải nhiều hơn 10 kí tự"
            })
        }
        if(req.body.content.blocks.length === 0 ){
            res.status(500).json({
                err:"Có lỗi khi tạo bài viết"
            })
        }
        const att = req.body.content.blocks.filter((url) =>{
            if(url.type === "image") {
              return url.data.file
            }
          })
          const url = att.map((e) => { 
              return e.data.file.url
          })
        const post = await PostModel.create({...req.body, author: userId,voteCount:userId,attachment:url.toString()})
        res.status(200).json({
            status: 'OK',
            data:{
                slug:post.slug,
                status: 'Bài viết được tạo thành công',
            }
        })
    } catch (err) {
        res.status(500).json({
            err:"Có lỗi khi tạo bài viết"
        })
    }
};
export const updatePost = async (req, res, next) => {
    try {
        const {postId} = req.params
        const att = req.body.content.blocks.filter((url) =>{
            if(url.type === "image") {
              return url.data.file
            }
          })
          const url = att.map((e) => { 
              return e.data.file.url
          })
        const post = await PostModel.findByIdAndUpdate(postId, {...req.body,attachment:url.toString()} , {new: true, runValidator:true})
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
            message:'Bài viết đã được xóa thành công'
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
        .populate('author','userName displayName avatar intro')
        .populate('category')
        res.status(200).json({
            status: 'success',
            post: post
        })
    }catch (error) {
        res.json(error)
    }
};
// export const votePost = async (req, res, next) => {
//     try {
//         const postId = req.body.postId
//         const prevPost =  await PostModel.findOne({_id : postId})
//         if(req.body.action  === "2" ){
//             const post = await PostModel.findByIdAndUpdate(postId,{ point: prevPost.point + 1 },{new: true, runValidator:true})
//             res.status(200).json({
//                 status: 'OK',
//                 point: post.point
//             })
//         }
//         //  1 unvote
//         else if (req.body.action === "1" ){
//             const post = await PostModel.findByIdAndUpdate(postId,{ point: prevPost.point -1  },{new: true, runValidator:true})
//             res.status(200).json({
//                 status: 'OK',
//                 point: post.point
//             })
//         }

//     } catch (err) {
//         next(err)
//     }
// };
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

