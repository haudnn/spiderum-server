import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const schema = new mongoose.Schema({
    userName:{  
        type: 'string',
        unique:true,
        trim:true,
        required:[true,'Tên tài khoản là bắt buộc và phải chứa từ 6 đến 30 ký tự'],
        minlength:[6, 'Tên tài khoản là bắt buộc và phải chứa từ 6 đến 30 ký tự']
    },
    password:{  
        type: 'string',
        unique:true,
        trim:true,
        required:[true,'Mật khẩu nên chứa từ 6 đến 100 ký tự'],
        minlength:[6, 'Mật khẩu nên chứa từ 6 đến 100 ký tự']
    },
    mail: {
        type: 'string',
    },
    displayName: {
        type: 'string',
    },
    gender : {
        type:'string'
    },
    intro: {
        type: 'string',
    },
    avatar: {
        type: 'string',
    },
    cover: {
        type: 'string',
    },
    mobile: {
        type: 'string'
    },
    identification: {
        type: 'string'
    },
    address: {
        type: 'string'
    },
    followers: {
        type: 'Number',
        default: 0
    },
    following: {
        type: 'Number',
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    dateOfBirth : {
        type: 'string'
    },
    monthOfBirth : {
        type: 'string'
    },
    yearOfBirth : {
        type: 'string'
    },
    category : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            default:[],
        }
    ]     
    
}, {
    timestamps: true
})
schema.pre('save', function(next){
    let user = this;
    bcrypt.hash(user.password,10,(err,hash) =>{
        if(err){
            return next(err)
        }else{
            user.password  = hash
            next()
        }
    })
})
export const UserModel = mongoose.model('User', schema)