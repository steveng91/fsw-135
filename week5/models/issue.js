const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const IssueSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    postDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Issue', IssueSchema)