const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const expressJwt = require('express-jwt')
const PORT = 5000

app.use(express.json())
app.use(morgan('dev'))

main().catch(err => console.log(err))
async function main(){
    await mongoose.connect('mongodb://localhost:27017/RockTheVote')
    console.log('connected to the DB')
}

app.use('/api/', expressJwt({ secret: process.env.SECRET, algorithms: ['RS256'] })) 

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))
app.use('/api/issue', require('./routes/issueRouter.js'))
app.use('/api/user', require('./routes/userRouter.js'))

app.use((err,req,res,next)=>{
    console.log(err.name)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`)
})
