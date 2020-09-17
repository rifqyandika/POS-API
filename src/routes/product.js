const express = require('express')
const route = express.Router()
const { getProduct, addProduct, editProduct, deleteProduct, detailProduct } = require('../controller/product')
const upload = require('../helper/upload')
const auth = require('../helper/auth')
const redis = require('../helper/redis')
const access = require('../helper/access')

// Product
route.get('/', redis.getProduct ,getProduct)
route.post('/add',auth.authentication, auth.authorizatin, addProduct)
route.put('/edit/:id',auth.authentication, auth.authorizatin,upload.single('image') ,editProduct)
route.delete('/delete/:id',auth.authentication, auth.authorizatin, deleteProduct)
route.get('/:id',auth.authentication, auth.authorizatin, detailProduct)

module.exports = route