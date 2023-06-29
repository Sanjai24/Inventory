const express = require('express')
const router = express.Router()
const database = require('./index')

router.get('/InventoryItem', (req, res) => {
    let Inventory = []

    database.collection('Current_Stock')
            .find()
            .forEach(stock => Inventory.push(stock))
            .then(() => {
                res.status(200).json(Inventory)
            })
            .catch(()=>{
                res.status(500).json({error: "Could not fetch the documents"})
            })
    
})

module.exports = router