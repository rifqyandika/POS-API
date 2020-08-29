const express = require('express')
const bodyParser = require('body-parser')
const port = 3003
const app = express()
const db = require('./src/config/db')
const route = require('./src/routes/product')

db.connect((err) => {
    if(err) throw err
    console.log('Database Connected');
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/product', route)

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})