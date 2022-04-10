import mongoose from "mongoose";
const schema = new mongoose.Schema({
    postId:{  
        type: 'string',
    },
    name: {
        type: 'string',
        required: true
    },
    policy: {
        type: 'string',
    },
    followCount: {
        type: 'Number',
        default: 0
    },
    attachments: String,
    slug: { type: String, slug: 'name', unique: true },
})
export const CategoryModel = mongoose.model('Category', schema)