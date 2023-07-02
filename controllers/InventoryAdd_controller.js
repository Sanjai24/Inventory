const { ObjectId } = require('mongodb')
const InventoryAddition_model = require('../models/InventoryAddition_model')

const InventoryAdd_controller = {
    async postItem(req, res){
        try{
            let data = req.body
            console.log(data)
            let items = await InventoryAddition_model.postItem(req.body)
            console.log(items)
            res.send(items)
        }
        catch(err){
            console.log(err.message)
            res.send(err.message)
        }
    },
    async addItem(req, res){
        try{
            let id = req.params
            console.log(new ObjectId(id))
            if(ObjectId.isValid(id)){
                let data = req.body
                console.log(data)
                let items = await InventoryAddition_model.updateOneItem( new ObjectId(id), data.quantity)
                console.log(items)
                res.send(items)
            }else{
                res.send("Not a valid id")
            }
            
        }
        catch(err){
            res.send(err.message)
        }
    },
    async consumeItem(req, res){
        try{
            
            let id = new ObjectId(req.params)
            console.log(id)
            if(ObjectId.isValid(id)){
                let data = req.body
                console.log(data)
                let getitem = await InventoryAddition_model.fetchOneItem(id)
                console.log(getitem.quantity)
                if(getitem.quantity >= data.quantity){
                    let items = await InventoryAddition_model.updateOneItem(id, -data.quantity)
                    if(items.modifiedCount == 0)
                        res.send("Enter id of item which already exists")
                    else
                        res.send(items)
                }else{
                    res.send("Cannot consume more than what's existant")
            }
        }
        }
        catch(err){
            res.send(err.message)
        }
    }
}

module.exports = InventoryAdd_controller