const db = require('../config/db')

const Users = {
    register : (data, generate) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (email, password) VALUES (?,?)`, [data.email, generate] ,(err, result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    login: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email=?`, data.email, (err, result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}

module.exports = Users