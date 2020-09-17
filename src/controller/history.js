const response = require('../helper/res')
const histModels = require('../models/history')
const { promise } = require('../config/db')

const history = {
    getHistory: (req, res) => {
        const search = !req.query.search ? '' : req.query.search
        const sort = !req.query.sortBy ? "id" : req.query.sortBy;
        const type = !req.query.type ? "asc" : req.query.type;
        const limit = !req.query.limit ? 10 : req.query.limit;
        const page = !req.query.page ? 1 : parseInt(req.query.page);
        const offset = page === 1 ? 0 : (page - 1) * limit;
        histModels.getHistory(search, sort, type, limit, offset)
            .then(result => {
                response.success(res, result, 'success')
            })
            .catch(err => {
                response.failed(res, [], err.message)
            })
    },
    addHistory: (req, res) => {
        const data = req.body
        histModels.addHistory(data)
            .then(result => {
                const masterId = result.insertId
                const order = data.orders.map((item) => {
                    histModels.addDetail(item, masterId)
                })
                Promise.all(order).then(() => {
                    response.success(res, result, 'success')
                }).catch((err) => {
                    console.log(err);
                })
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
