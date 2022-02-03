const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if(err){
      console.log("IT BROKE HERE")
      res.status(500)
      return next(err)
    }
    if(user){
      res.status(403)
      return next(new Error('Username Already Exists'))
    }
  console.log(req.body)

    const newUser = new User(req.body)
    console.log(newUser)
    newUser.save((err, savedUser) => {
      console.log(savedUser, "saved user")
      // console.log(err, 'error')
      if(err){
        console.log(err.name)
        res.status(500)
        return next(err)
      }
      const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
      return res.status(201).send({ token, user: savedUser })
    })
  })
})

authRouter.post("/login", (req, res, next) => {
  console.log(req.body)
  User.findOne({ username: req.body.username }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(!user || req.body.password !== user.password){
      res.status(403)
      return next(new Error('Invalid Credentials'))
    }
    const token = jwt.sign(user.toObject(), process.env.SECRET)
    return res.status(200).send({ token, user })
  })
})

// authRouter.post("/login",(req,res,nest)=>{
//   user.findOne({username:req.body.username.toLowerCase()}, (err, user)=>{
//     if(err){
//       res.status(500)
//       return next(err)
//     }
//     if(!user || req.body.password !== user.password){
//     res.status(new Error('invalid login'))
//     }
//     const token = jwt.sign(user.toObject(), process.env.SECRET)
//     return res.status(200).send({token, user})
//   })
// })

module.exports = authRouter