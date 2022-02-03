const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')



userRouter.get('/',(req,res,next) =>{
    User.find((err,userList)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(userList)
    })
})

userRouter.post('/', (req,res,next)=>{
const createUser = new User(req.body)
    createUser.save((err,newUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newUser)
    })
})

userRouter.get('/:userId',(req,res,next)=>{
    User.findOne({_id: req.params.userId}, req.body, {new: true}, (err,foundUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundUser)
    })
})

userRouter.delete('/:userId',(req,res,next)=>{
    User.findOneAndDelete({_id: req.params.userId},(err,deleteUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send("User Deleted from database")
    })
})

userRouter.put('/:userId',(req,res,next)=>{
    User.findOneAndUpdate({_id: req.params.userId},req.body,(err, updateUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send("User Updated")
    })
})

module.exports = userRouter