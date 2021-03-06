const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if(err){
      // console.log("IT BROKE HERE")
      res.status(500)
      return next(err)
    }
    if(user){
      res.status(403)
      return next(new Error('Username Already Exists'))
    }
  // console.log(req.body)

    const newUser = new User(req.body)
    // console.log(newUser)
    newUser.save((err, savedUser) => {
      // console.log(savedUser, "saved user")
      // console.log(err, 'error')
      if(err){
        // console.log(err.name)
        res.status(500)
        return next(err)
      }
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
      return res.status(201).send({ token, user: savedUser.withoutPassword() })
    })
  })
})

authRouter.post("/login", (req, res, next) => {
  // console.log(req.body)
  User.findOne({ username: req.body.username }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(!user){
      // console.log('invalid username')
      res.status(403)
      return next(
        new Error('Invalid Credentials'))
    }

    user.checkPassword(req.body.password, (err, isMatch)=>{
      if(err){
        res.status(403)
        return next(new Error('Invalid Credentials'))
      }
      if(!isMatch === ' '){
        res.status(403)
        return next(new Error('invalid credentials'))
      }
      if(!isMatch){
        res.status(403)
        return next(new Error('Invalid Credentials'))
      }
    })
    const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
    return res.status(200).send({ token, user: user.withoutPassword() })
  })
})



module.exports = authRouter