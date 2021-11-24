const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    enrollDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    editDate:{
        type: Date,
        required: false,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)