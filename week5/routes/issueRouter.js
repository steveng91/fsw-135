const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')

issueRouter.get('/',(req,res,next) =>{
    // console.log(issue.find,"it broke here")
    Issue.find((err,issueList)=>{
        // console.log(issueList,'this is where it broke')
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issueList)
    })
})

issueRouter.post('/', (req,res,next)=>{
    const createIssue = new Issue(req.body)
    createIssue.save((err,newIssue)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newIssue)
    })
})

issueRouter.get('/:issueId',(req,res,next)=>{
    Issue.findOne({_id: req.params.issueId}, req.body, {new: true}, (err,foundIssue)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundIssue)
    })
})

issueRouter.delete('/:issueId',(req,res,next)=>{
    Issue.findOneAndDelete({_id: req.params.issueId},(err,deleteIssue)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send("Issue Deleted from database")
    })
})

issueRouter.put('/:issueId',(req,res,next)=>{
    Issue.findOneAndUpdate({_id: req.params.issueId},req.body,(err, updateIssue)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send("Issue Updated")
    })
})

module.exports = issueRouter