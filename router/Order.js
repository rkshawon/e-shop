const express = require('express')
const route  = express.Router()
const OrderController = require('../controller/OrderController')

route.put('/orders/:id', OrderController.orders)
route.post('/orders', OrderController.postorders)
route.get('/getorders/:id',OrderController.getorders)

module.exports = route