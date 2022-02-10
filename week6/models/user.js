const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username:{
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
UserSchema.pre('save', function(next){
    const user =this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 8, (err, hash) => {
        if(err) return next(err)
        user.password = hash
        next()
    })
})
UserSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>{
       if(err) return callback(err)
       return callback(null, isMatch)
    })
}
UserSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model('User', UserSchema)