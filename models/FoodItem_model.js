const mongoose= require('mongoose')
const Schema = mongoose.Schema

const foodItemSchema = new Schema({
    food_Name: {
        type: String,
        required: true
    }, 
    price: {
        min:0,
        type: Number,
        required: true
    },
    ingredients:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Current_Stock',
        required: true,
    }],
    quantity: [{
        min: 0,
        type: Number,
        required:true
    }]
})

const FoodItem = mongoose.model('Food_Items', foodItemSchema)

const FoodItem_model = {
    async getAllItems(){
        return await FoodItem.find().populate('ingredients')
    },
    async getItem(id){
        return await FoodItem.findById(id).populate('ingredients')
    },
    async postItem(userdata){
        return await FoodItem(userdata).save()
    }
}

module.exports = FoodItem_model