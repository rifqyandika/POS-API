const db = require('../config/db')
const { promise } = require('../config/db')
const { NEWDATE } = require('mysql2/lib/constants/types')

const products = {
    getProduct: (name, sort, type) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product WHERE name_product LIKE '%${name}%' ORDER BY ${sort} ${type}`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else {
                    resolve(result)
                } 
            })
        })
    },
    addProduct: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO product (name_product, price_product, image_product, date) 
            VALUES ('${data.name_product}','${data.price_product}','${data.image_product}', CURRENT_TIMESTAMP())`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else {
                    resolve(result)
                }
            })
        })
    },
    editProduct: (data, id) => {
        return new Promise((resolve, reject)=> {
            db.query(`UPDATE product SET name_product='${data.name_product}', price_product='${data.price_product}', image_product='${data.image_product}'
            WHERE id_product=${id}`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM product WHERE id_product=${id}`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}

module.exports = products