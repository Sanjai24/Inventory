const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Inventory_model = require('./InventoryItem_model')

const inventoryAddSchema = new Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Current_Stock'
    },
    item_name: {
        type: String,
        required: true
    },
    quantity: {
        min: 0,
        type: Number,
        required: true
    }, 
    units: {
        type: String, 
        required: true
    }
})




inventoryAddSchema.post('save', async(doc, next) => {
    itemdata= {
        item_name: doc.item_name,
        quantity: doc.quantity,
        units: doc.units
    }
    const posted = await Inventory_model.postItem(itemdata)
    console.log(posted._id)
    await Inventory_Addition.findByIdAndUpdate({_id: doc._id}, {item_id: posted._id})
    next()
})


let itemID, Quantity
inventoryAddSchema.pre('updateOne', async function(next){
    itemID= this._conditions.item_id
    
} )

inventoryAddSchema.post('updateOne', async function(doc, next)  {
    console.log(itemID)
    const updated = await Inventory_Addition.findOne({item_id: itemID})
    Quantity = updated.quantity
    await Inventory_model.updateOneItem(itemID, Quantity)
    next()
})




 const Inventory_Addition = mongoose.model('InventoryAddition', inventoryAddSchema)

 const InventoryAddition_model = {
    async updateOneItem(id, quantity){
        return await Inventory_Addition.updateOne({item_id: id}, {$inc: {quantity: quantity}})
    }, 
    async fetchOneItem(id){
        return await Inventory_Addition.findOne({item_id: id})
    },
    async postItem(userdata){   
        return await Inventory_Addition(userdata).save()
    }
 }

module.exports = InventoryAddition_model
