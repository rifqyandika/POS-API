const mysql = require('mysql2')
const db = require('../config/db')

const category = {
    getCat : () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM category`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else {
                    resolve(result)
                }
            })
        })
    },
    addCat: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO category (category) VALUES('${data.category}')`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else {
                    resolve(result)
                }
            })
        })
    },
    editCat: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE category SET category='${data.category}' WHERE id_category='${id}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    delCat: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM category WHERE id_category='${id}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = category