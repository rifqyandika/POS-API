const db = require('../config/db')
const { promise } = require('../config/db')
const { NEWDATE } = require('mysql2/lib/constants/types')

const products = {
    getProduct: (name, sort, type, limit, offset) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product WHERE name LIKE '%${name}%' ORDER BY ${sort} ${type} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else {
                    resolve(result)
                } 
            })
        })
    },
    addProduct: (data, url, date) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO product (name, price, image, category, date) 
            VALUES ('${data.name}','${data.price}','${url}', '${data.category}', now())`, (err, result) => {
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
    },
    detailProduct: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product WHERE id_product=${id}`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = products