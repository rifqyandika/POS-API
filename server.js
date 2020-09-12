const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const db = require('./src/config/db')
const product = require('./src/routes/product')
const category = require('./src/routes/category')
const history = require('./src/routes/history')
const users = require('./src/routes/users')
const cors = require('cors')

db.connect((err) => {
    if(err) throw err
    console.log('Database Connected');
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('src/file'))
app.use('/product', product)
app.use('/category', category)
app.use('/history', history)
app.use('/user', users)

app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
})