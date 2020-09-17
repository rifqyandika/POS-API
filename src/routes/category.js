const express = require('express')
const route = express.Router()
const { getCat, addCat, editCat, delCat } = require('../controller/category')
const redis = require('../helper/redis')

// Category
route.get('/', redis.getCat ,getCat)
route.post('/add', addCat)
route.put('/edit/:id', editCat)
route.delete('/delete/:id', delCat)

module.exports = route