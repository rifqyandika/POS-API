const db = require('../config/db')
const { reject, result } = require('lodash')

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
    },
    update: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET status= TRUE WHERE email='${email}'`, (err, result) => {
               if (err) {
                  reject(new Error(err))
               } else {
                  resolve(result)
               }
            })
         })
    },
    refreshToken: (token, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET refreshToken='${token}' WHERE id='${id}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}

module.exports = Users