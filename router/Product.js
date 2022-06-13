const express = require('express')
const route  = express.Router()
const ProductController = require('../controller/ProductController')
const verify = require('../VerifyToken')

route.post('/singleproduct/:id', verify, ProductController.singleproduct)
route.get('/adminproduct/:id', ProductController.adminproduct)
route.get('/getsingleproduct/:id', ProductController.getsingleproduct)
route.get('/allproduct/:id', ProductController.allproduct)
route.put('/updaterating/:id', ProductController.updaterating)
route.put('/pushidinrating/:id', ProductController.pushidinrating)
route.get('/searchproduct', ProductController.searchproduct)

module.exports = route