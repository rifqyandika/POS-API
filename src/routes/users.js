const express = require('express')
const route = express.Router()
const { register, login } = require('../controller/Users')
const authBody = require('../helper/authBody')

route.post('/register', authBody ,register)
route.get('/login', login)

module.exports = route