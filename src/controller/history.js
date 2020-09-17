const response = require('../helper/res')
const histModels = require('../models/history')
const { promise } = require('../config/db')
const redis = require('redis')
const redisClient = redis.createClient()

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
                redisClient.set('history', JSON.stringify(result))
                const row = result[0].count;
                const meta = {
                    totalItem: row,
                    totalPage: Math.ceil(row / limit),
                    page,
                };
                response.meta(res, result, meta, "success");
            })
            .catch(err => {
                response.failed(res, [], err.message)
            })
    },
    addHistory: (req, res) => {
        const data = req.body
        histModels.addHistory(data)
            .then(result => {
                redisClient.del('history')
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
                    redisClient.del('history')
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
                    redisClient.del('history')
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
