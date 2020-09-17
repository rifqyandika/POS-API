const express = require('express')
const route = express.Router()
const { getCat, addCat, editCat, delCat } = require('../controller/category')
const redis = require('../helper/redis')
const auth = require('../helper/auth')

// Category
route.get('/',auth.authentication, auth.authorizatin, redis.getCat ,getCat)
route.post('/add',auth.authentication, auth.authorizatin, addCat)
route.put('/edit/:id',auth.authentication, auth.authorizatin, editCat)
route.delete('/delete/:id',auth.authentication, auth.authorizatin, delCat)

module.exports = route