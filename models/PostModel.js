import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
mongoose.plugin(slug);
const schema = new mongoose.Schema({
    categoryId:{  
        type: 'string',
    },
    hagtagId:{  
        type: 'string',
    },
    title: {
        type: 'string',
        trim: true,
        required:[true,'Tiêu đề bài viết không được để trống và phải nhiều hơn 10 kí tự'],
        minlength:[10, 'Tiêu đề bài viết không được để trống và phải nhiều hơn 10 kí tự']
    },
    content: {
        type: 'string',
        trim: true,
        minlength:[1, 'Có lỗi khi tạo bài viết']
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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})
export const PostModel = mongoose.model('Post', schema)