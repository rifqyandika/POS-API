const db = require('../config/db')
const fs = require('fs');

const products = {
    getProduct: (name, sort, type, limit, offset) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_product, product.name, price, image, category.category, date FROM product INNER JOIN category on product.id_category = category.id_category WHERE name LIKE '%${name}%' ORDER BY ${sort} ${type} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    addProduct: (data, body, date) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO product (name, price, image, id_category, date) 
            VALUES ('${data.name}','${data.price}','${body}', '${data.category}', now())`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    editProduct: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE product SET name='${data.name}', price='${data.price}', image='${data.image}', id_category='${data.category}'
            WHERE id_product=${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product WHERE id_product=${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(new Promise((reject, resolve) => {
                        db.query(`DELETE FROM product WHERE id_product=${id}`, (err, resdl) => {
                            const img = result[0].image
                            fs.unlink(`src/file/${img}`, (err) => {
                                if (err) throw err
                                console.log('success');
                            })
                            if (err) {
                                reject(new Error(err))
                            } else {
                                resolve(resdl)
                            }
                        })
                    }))
                }
            })
        })
    },
    detailProduct: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_product, product.name, price, image, category.category, date FROM product INNER JOIN category on product.id_category = category.id_category WHERE id_product=${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = products