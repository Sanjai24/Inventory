const { ObjectId } = require('mongodb')
const FoodItem_model = require('../models/FoodItem_model')
const InventoryAddition_model = require('../models/InventoryAddition_model')

const FoodItem_controller = {

    async getAllItems(req,res){
        try{
            let FoodItems = await FoodItem_model.getAllItems()
            res.send(FoodItems)
        }
        catch(err){
            res.send(err.message)
        }
    },

    async getItem(req, res){
        try{
            let id = req.params
            let FoodItem = await FoodItem_model.getItem(new ObjectId(id))
            res.send(FoodItem)
        }
        catch(err){
            res.send(err.message)
        }
    },
    async postItem(req, res){
        try{
            let data = req.body
            console.log(data)
            let item_post = await FoodItem_model.postItem(req.body)
            let id = item_post._id.valueOf()
            let item_get = await FoodItem_model.getItem(id)
            let response = []
            for(var i in item_get.quantity){
                if(item_get.quantity[i] <=  item_get.ingredients[i].quantity){
                    await InventoryAddition_model.updateOneItem(item_get.ingredients[i]._id, -item_get.quantity[i]) 
                }
                else{
                    response[i-1] = item_get.ingredients[i].item_name + " exists lesser than required"
                }  
            }
            if(response.length){
                console.log(response)
                res.send(response)
            }else{
                console.log(response)
                res.send(item_get)
            }
            
        }
        catch(err){
            console.log(err.message)
            res.send(err.message)
        }
    }
}

module.exports = FoodItem_controller