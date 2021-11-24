const express = require('express')
const storeRouter = express.Router()
const Inventory = require('../models/inventory.js')
console.log(Inventory)
storeRouter.get('/', (req,res,next) =>{
    Inventory.find((err,inventory) =>{
        if(err){
            console.log(err)
            res.status(500)
            return next(err)
        }
        return res.status(200).send(inventory)
    })
})

storeRouter.post('/',(req,res,next)=>{
    const newItem = new Inventory(req.body)
    newItem.save((err,savedItem)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedItem)
    })
})

storeRouter.get('/:inventoryId',(req,res,next)=>{
    Inventory.findOne({_id: req.params.inventoryId}, (err,foundItem)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundItem)
    })
})

storeRouter.delete('/:inventoryId',(req,res,next)=>{
    Inventory.findOneAndDelete({_id: req.params.inventoryId},(err,deletedItem)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`${deletedItem.name} removed from database`)
    })
})

storeRouter.put('/:inventoryId',(req,res,next)=>{
    Inventory.findOneAndUpdate({_id: req.params.inventoryId}, req.body, (err,updatedItem)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(`${updatedItem.name} has been updated`)
    })
})

module.exports = storeRouter