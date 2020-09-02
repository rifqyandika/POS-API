const express = require('express')
const route = express.Router()
const { getHistory, addHistory, editHistory, deleteHistory }  = require('../controller/history')

route.get('/history', getHistory)
route.post('/add', addHistory)
route.put('/edit/:id', editHistory)
route.delete('/delete/:id', deleteHistory)

module.exports = route