const express = require('express')
const route = express.Router()
const { getProduct, addProduct, editProduct, deleteProduct } = require('../controller/product')

// Product
route.get('/product', getProduct)
route.post('/add', addProduct)
route.put('/edit/:id', editProduct)
route.delete('/delete/:id', deleteProduct)

module.exports = route