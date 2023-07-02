const express = require('express')
const router = express.Router()

const Inventory_controller = require('../controllers/Inventory_controller')
const InventoryAdd_controller = require('../controllers/InventoryAdd_controller')
const FoodItem_controller = require('../controllers/FoodItem_controller')

router.get('/InventoryItem', Inventory_controller.getItems)
router.post('/InventoryAddition', InventoryAdd_controller.postItem)
router.patch('/InventoryAddition/:id', InventoryAdd_controller.addItem)
router.patch('/InventoryConsumption/:id', InventoryAdd_controller.consumeItem)

router.get('/FoodItem', FoodItem_controller.getAllItems)
router.get('/FoodItem/:id', FoodItem_controller.getItem)
router.post('/FoodItem', FoodItem_controller.postItem)


module.exports = router