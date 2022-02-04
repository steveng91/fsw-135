const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

commentRouter.get('/',(req,res,next) =>{
    // console.log(req.body, "it broke here")
    Comment.find((err,commentList)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(commentList)
    })
})

commentRouter.post('/', (req,res,next)=>{
    req.body.user = req.user._id
    const createComment = new Comment(req.body)
    // console.log(req.body, "here is where it broke")
    createComment.save((err,newComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newComment)
    })
})

commentRouter.get('/:commentId',(req,res,next)=>{
    Comment.findOne({_id: req.params.commentId}, req.body,(err,foundComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundComment)
    })
})

commentRouter.delete('/:commentId',(req,res,next)=>{
    Comment.findOneAndDelete({_id: req.params.commentId},(err,deleteComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send("Comment Deleted from database")
    })
})

commentRouter.put('/:commentId',(req,res,next)=>{
    Comment.findOneAndUpdate({_id: req.params.commentId},req.body, {new: true},(err, updateComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send("Comment Updated")
    })
})

commentRouter.get('/search/byUser', (req,res,next)=>{
    let userId = req.user._id
    Comment.find({user: userId},
        (err,comment)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(comment)
        })
})

module.exports = commentRouter