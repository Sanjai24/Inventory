const express = require('express')
const app = express()
const { connectToDb, getDb} = require('./database')
const router = require('./routes')
app.use(express.json())
const PORT = process.env.PORT || 4000

let database

connectToDb((err) => {
    if(!err){
        app.listen(PORT, ()=> {
            console.log("Inventory is listening to port PORT")
        })
        database = getDb()
    }else{
        console.log("Database connection failed")
    }
})

app.get('/InventoryItem', (req, res) => {
    let Inventory = []

    database.collection('Current_Stock')
            .find()
            .forEach(stock => Inventory.push(stock))
            .then(() => {
                res.status(200).json(Inventory)
            })
            .catch((err)=>{
                console.log(Inventory)
                res.status(500).json({error: err})
            })
})

app.patch('/InventoryAddition', async (req, res) => {
    const addition = req.body
    let coco = {}

    await database.collection('Current_Stock')
            .findOne({item_name: addition.item_name})
            .then(doc => {
                // res.status(200).json(doc)
                coco = doc
                console.log(coco.item_name)
            })
            .catch((err) => {
                // res.status(500).json({error: "The problem is"})
                console.log("Could not find document")
            })
    // addition.quantity = coco.quantity + addition.quantity

    // console.log(addition.quantity)

    if(coco){
        // console.log("works")
        database.collection('Current_Stock')
          .updateOne({item_name: addition.item_name}, {$inc: {quantity: addition.quantity}})
          .then(doc => {
              res.status(200).json(doc)
            })
          .catch(err => {
            res.status(500).json({error: err})
            })
    }else{
        database.collection('Current_Stock')
                .insertOne(addition)
                .then(doc => {
                    res.status(201).json(doc)
                  })
                .catch(err => {
                  res.status(500).json({error: "Could not add the document"})
                  })
    }



})

app.patch('/InventoryConsumption', async (req, res) => {

    const consumption = req.body
    let consum = {}

    await database.collection('Current_Stock')
            .findOne({item_name: consumption.item_name})
            .then(doc => {
                // res.status(200).json(doc)
                consum = doc
                console.log(consum.item_name)
            })
            .catch((err) => {
                res.status(500).json({error: "Could not find document, Cannot consume what's not there"})
                // console.log("Could not find document, Cannot consume what's not there")
            })

    console.log(consum)
    
    if(consum.quantity >= consumption.quantity){
        database.collection('Current_Stock')
          .updateOne({item_name: consumption.item_name}, {$inc: {quantity: -consumption.quantity}})
          .then(doc => {
              res.status(200).json(doc)
            })
          .catch(err => {
            res.status(500).json({error: "Could not fetch the document"})
            })
    } else{
        res.status(500).json({error: "Cannot consume more than what's in the inventory"})
    }

})

// app.use(router)

// module.exports = database
