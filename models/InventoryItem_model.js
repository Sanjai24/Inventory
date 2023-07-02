const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventorySchema = new Schema({
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


// inventorySchema.pre('save', function(next) {
//     console.log(this)
//     console.log("Something has been saved")
//     next()
// })

// inventorySchema.post('save', (doc, next) => {
//     console.log(doc.item_name + " has been saved")
//     next()
// })


// inventorySchema.pre('updateOne', function(next) {
//     console.log(this.updateOne({}))
//     console.log("This one right here")
//     next()
// })

// inventorySchema.post('updateOne', (doc, next) => {
//     console.log(doc )
//     next()
// })




 const Inventory = mongoose.model('Current_Stock', inventorySchema)

 const Inventory_model = {
    async fetchItems(){
        return await Inventory.find()
    },
    async fetchOneItem(id){
        return await Inventory.find({_id: id})
    },
    async updateOneItem(id, quantity){
        return await Inventory.updateOne({_id: id}, {quantity: quantity})
    }, 
    // async updateManyItems(id)
    async postItem(itemdata){
        return await Inventory(itemdata).save()
    }
 }

module.exports = Inventory_model
