const Inventory_model = require('../models/InventoryItem_model')

const Inventory_controller = {
    async getItems(req,res){
        try{
            let items = await Inventory_model.fetchItems()
            console.log(items)
            res.send(items)
        }
        catch(err){
            res.send(err.message)
        }
    }
}

module.exports = Inventory_controller