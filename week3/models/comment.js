const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    user:{ 
        type:Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    issue:{
        type:Schema.Types.ObjectId,
        ref:'issue',
        required: true
    },
    body:{
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    editDate:{
        type: Date,
        required: false,
        default: Date.now
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false
    }
})

module.exports = mongoose.model('Comment', CommentSchema)