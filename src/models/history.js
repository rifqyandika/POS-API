const db = require('../config/db')

const history = {
    getHistory: (name) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id, cashier, invoice, amount, ppn, (SELECT COUNT(*) FROM history) AS count FROM history WHERE cashier LIKE '%${name}%'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    addDetail: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO detail (id_history, id_product, name, qty, price) VALUES ('${id}','${data.id_product}','${data.name}','${data.qty}', '${data.price}')`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else {
                    resolve(result)
                }
            } )
        })
    },
    addHistory: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO history (cashier, invoice ,amount, ppn) VALUES ('${data.cashier}', '${data.invoice}','${data.amount}', '${data.ppn}')`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else {
                    resolve(result)
                }
            })
        })
    },
    editHistory: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE history SET cashier='${data.cashier}', orders='${data.orders}', amount='${data.amount}', invoice='${data.invoice}' WHERE id='${id}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    deleteHistory: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM history WHERE id=${id}`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}

module.exports = history