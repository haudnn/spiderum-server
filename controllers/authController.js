import {
    UserModel
} from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const register = async (req, res, next) => {
    try {
        const newUser = req.body;
        const user = new UserModel(newUser);
        await user.save();
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
        res.status(500).json({
            error: err,
        });
    }
};
export const login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if(!user){
            // email err
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

        }
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }

};
export const getUser = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};