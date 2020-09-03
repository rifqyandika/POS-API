const db = require('../config/db')

const history = {
    getHistory: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM history`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    addHistory: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO history (cashier, orders, date, amount) 
            VALUES ('${data.cashier}', '${data.orders}', NOW() ,'${data.amount}')`, (err, result) => {
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