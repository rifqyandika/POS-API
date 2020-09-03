const express = require('express')
const route = express.Router()
const { getProduct, addProduct, editProduct, deleteProduct, detailProduct } = require('../controller/product')
const upload = require('../helper/upload')

// Product
route.get('/', getProduct)
route.post('/add', upload.single('image') ,addProduct)
route.put('/edit/:id',upload.single('image') ,editProduct)
route.delete('/delete/:id', deleteProduct)
route.get('/:id', detailProduct)

module.exports = route