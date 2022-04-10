import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
mongoose.plugin(slug);
const schema = new mongoose.Schema({
    categoryId:{  
        type: 'string',
    },
    userId:{  
        type: 'string',
    },
    hagtagId:{  
        type: 'string',
    },
    title: {
        type: 'string',
        required: true
    },
    author: {
        type: 'string',
        // required: true,
    },
    content: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string'
    },
    attachments: String,
    slug: { type: String, slug: 'title', unique: true },
    likeCount: {
        type: 'Number',
        default: 0
    },
}, {
    timestamps: true
})
export const PostModel = mongoose.model('Post', schema)