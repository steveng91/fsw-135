const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = 9000

app.use(express.json())
app.use(morgan('dev'))

main().catch(err => console.log(err)) 
async function main(){
    await mongoose.connect('mongodb://localhost:27017/inventory')
    console.log('connected to the DB')
}

app.use('/inventory', require('./routes/inventory.js'))

app.use((err,req,res,next)=>{
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(PORT, ()=>{
    console.log(`app listening on port ${PORT}`)
})
