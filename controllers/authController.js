import {
    UserModel
} from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const register = async (req, res, next) => {
    try {
        // const newUser = req.body;
        // const user = new UserModel(newUser);
        // await user.save({...req.body, isVerified:'true'});
        const user = await UserModel.create({...req.body, isVerified:true})
        const token = jwt.sign({
            userId: user._id
        }, process.env.APP_SECRET)
        res.status(200).json({
            status: 'OK',
            data: {
                token,
                userName: user.userName
            }
        });
    } catch (err) {
        next(err)
    }
};
export const login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if(!user){
            const err  = new Error ('Email is not correct')
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
                    userName: user.userName
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
    // try {
    //     const users = await UserModel.find();
    //     res.status(200).json(users);
    // } catch (err) {
    //     res.status(500).json({
    //         error: err,
    //     });
    // }
    try {
        const data =  { user: null }
        if (req.user) {
            const user = await UserModel.findOne({ _id: req.user.userId });
            data.user = { userName: user.userName }
        }
        res.status(200).json({
            status: 'success',
            data: data
        })
    }catch (error) {
        res.json(error)
    }
};