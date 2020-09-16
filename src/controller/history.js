const response = require('../helper/res')
const histModels = require('../models/history')
const { promise } = require('../config/db')

const history = {
    getHistory: (req, res) => {
        try {
            histModels.getHistory()
                .then(result => {
                    response.success(res, result, 'success')
                })
                .catch(err => {
                    response.failed(res, [], err.message)
                })
        } catch (err) {
            response.failed('Server Internal Error')
        }
    },
    addHistory: (req, res) => {
        const data = req.body
            histModels.addHistory(data)
                .then(result => {
                    const masterId = result.insertId
                    const order = data.orders.map((item) => {
                        histModels.addDetail(item, masterId)
                    })
                    console.log(order);
                    // Promise.all(order).then((resulut) => {
                    //     console.log(resulut);
                    // }).catch((err)=> {
                    //     console.log(err);
                    // })
                })
                .catch(err => {
                    response.failed(res, [], err.message)
                })
    },
    editHistory: (req, res) => {
        try {
            const id = req.params.id
            const data = req.body
            histModels.editHistory(data, id)
                .then(result => {
                    response.success(res, result, 'success')
                })
                .catch(err => {
                    response.failed(res, [], err.message)
                })
        } catch (err) {
            response.failed('Server Internal Error')
        }
    },
    deleteHistory: (req, res) => {
        try {
            const id = req.params.id
            histModels.deleteHistory(id)
                .then(result => {
                    response.success(res, result, 'success')
                })
                .catch(err => {
                    response.failed(res, [], err.message)
                })
        } catch (err) {
            response.failed('Server Internal Error')
        }
    }
}

module.exports = history
