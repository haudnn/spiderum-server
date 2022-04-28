import {
    UserModel
} from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const register = async (req, res, next) => {
    try {
        const user = await UserModel.create({...req.body, isVerified:true})
        const token = jwt.sign({
            userId: user._id
        }, process.env.APP_SECRET)
        res.status(200).json({
            status: 'OK',
            data: {
                token,
                // userName: user.userName,
                // displayName: user.displayName
            }
        });
    } catch (err) {
        next(err)
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({userName: req.body.userName})
        if(!user){
            const err  = new Error ('Sai tên đăng nhập hoặc mật khẩu')
            err.statusCode = 400
            return next(err)
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({
                userId: user._id
            }, process.env.APP_SECRET)
            res.status(200).json({
                status: 'OK',
                data: {
                    token,
                    _id: user._id,
                    userName: user.userName,
                    displayName: user.displayName,
                    mobile:user.mobile,
                }
            });
        } else {
            const err  = new Error ('Password is not correct')
            err.statusCode = 400
            return next(err)
        }
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};
export const getCurrentUser = async (req, res, next) => {
    try {
        const data =  { user: null }
        if (req.user) {
            const user = await UserModel.findOne({ _id: req.user.userId }).populate('category');
            data.user = user
        }
        res.status(200).json({
            status: 'success',
            data: data
        })
    }catch (error) {
        res.json(error)
    }
};
export const createCategoryUser = async (req, res, next) => {
    const {userId} = req.user
    try {
        const data = await UserModel.findOneAndUpdate({ _id: userId},{
            $push: {
                category: {                   
                    $each: req.body,
                }
            }
         } , {new:true} )
        res.status(200).json({
            status: 'OK',
            data:data,
        })
    } catch (err) {
        next(err)
    }
};
export const deleteCategoryUser = async (req, res, next) => {
    const {userId} = req.user
    try {
        const data = await UserModel.findOneAndUpdate({ _id: userId},{
            $pull: {
                category :{
                    $in :req.body
                }
            }
         } , {new:true} )
        res.status(200).json({
            status: 'OK',
            data:data,
        })
    } catch (err) {
        next(err)
    }
};