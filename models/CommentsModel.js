import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
mongoose.plugin(slug);
var schema = new mongoose.Schema({
    content: {
        type: String,
    },
    reply : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        {
            type: String
        }
    ],  
    voteCount: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default:[],
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
})
export const CommentsModel = mongoose.model('Comments', schema)