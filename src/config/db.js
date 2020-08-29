const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1n1sayap',
    database: 'store'
})

module.exports = db