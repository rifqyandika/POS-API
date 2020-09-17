const express = require('express')
const route = express.Router()
const { getHistory, addHistory, editHistory, deleteHistory }  = require('../controller/history')
const redis = require('../helper/redis')
const auth = require('../helper/auth')

route.get('/',auth.authentication, auth.authorizatin, redis.getHis ,getHistory)
route.post('/add',auth.authentication, auth.authorizatin, addHistory)
route.put('/edit/:id',auth.authentication, auth.authorizatin, editHistory)
route.delete('/delete/:id',auth.authentication, auth.authorizatin, deleteHistory)

module.exports = route