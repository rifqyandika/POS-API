const express = require('express')
const route = express.Router()
const { register, login, refresh, verify } = require('../controller/Users')
const authBody = require('../helper/authBody')

route.post('/register', authBody ,register)
route.post('/login', login)
route.post('/refresh', refresh)
route.get('/verify/:token', verify)

module.exports = route