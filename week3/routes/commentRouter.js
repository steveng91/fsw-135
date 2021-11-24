const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

commentRouter.get('/',(req,res,next) =>{
    Comment.find((err,commentList)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(commentList)
    })
})

commentRouter.post('/', (req,res,next)=>{
    const createComment = new Comment(req.body)
    createComment.save((err,newComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newComment)
    })
})

commentRouter.get('/:commentId',(req,res,next)=>{
    Comment.findOne({_id: req.params.commentId}, req.body, {new: true}, (err,foundComment)=>{
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
    Comment.findOneAndUpdate({_id: req.params.commentId},req.body,(err, updateComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send("Comment Updated")
    })
})

module.exports = commentRouter