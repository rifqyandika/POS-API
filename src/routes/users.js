const express = require('express')
const route = express.Router()
const { register, login, refresh, verify, deleteUser, logoutUser } = require('../controller/Users')
const authBody = require('../helper/authBody')
const auth = require('../helper/auth')
const access = require('../helper/access')

route.post('/register', authBody ,register)
route.post('/login',  login)
route.post('/refresh', refresh)
route.get('/verify/:token', verify)
route.delete('/:id', deleteUser)
route.delete('/logout/:id', logoutUser)

module.exports = route