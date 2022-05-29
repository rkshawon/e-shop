const express = require('express')
const route  = express.Router()
const ProductController = require('../controller/ProductController')

route.post('/singleproduct/:id', ProductController.singleproduct)
route.get('/getsingleproduct/:id', ProductController.getsingleproduct)
route.get('/allproduct', ProductController.allproduct)
route.put('/updaterating/:id', ProductController.updaterating)
route.put('/pushidinrating/:id', ProductController.pushidinrating)

module.exports = route