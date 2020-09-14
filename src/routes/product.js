const express = require('express')
const route = express.Router()
const { getProduct, addProduct, editProduct, deleteProduct, detailProduct } = require('../controller/product')
const upload = require('../helper/upload')
const auth = require('../helper/auth')
const redis = require('../helper/redis')

// Product
route.get('/', auth.authentication, auth.authorizatin, redis.getProduct ,getProduct)
route.post('/add', addProduct)
route.put('/edit/:id',upload.single('image') ,editProduct)
route.delete('/delete/:id', deleteProduct)
route.get('/:id', detailProduct)

module.exports = route