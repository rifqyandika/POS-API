const CatModel = require('../models/category')
const response = require('../helper/res')
const redis = require('redis')
const redisClient = redis.createClient()

const category = {
    getCat: (req, res) => {
        try {
            const search = !req.query.search ? '' : req.query.search
            const sort = !req.query.sortBy ? 'id_category' : req.query.sortBy
            const type = !req.query.type ? 'asc' : req.query.type
            const limit = !req.query.limit ? 5 : req.query.limit
            const page = !req.query.page ? 1 : req.query.page
            const offset = page === 1 ? 0 : (page - 1) * limit
            CatModel.getCat(search, sort, type, limit, offset)
                .then(result => {
                    redisClient.set('category', JSON.stringify(result))
                    const row = result[0].count
                    const meta = {
                        totalItem: row,
                        totalPage: Math.ceil(row / limit),
                        page
                    }
                    response.meta(res, result, meta, 'success')
                    // response.success(res, result, 'Success')
                })
                .catch(err => {
                    response.failed(res, [], err.message)
                })
        } catch (err) {
            response.failed(res, [], 'Server internal error')
        }
    },
    addCat: (req, res) => {
        const body = req.body
        CatModel.addCat(body)
            .then((result) => {
                redisClient.del('category')
                response.success(res, result, 'added')
            }).catch((err) => {
                response.failed(err.message)
            })
    },
    editCat: async (req, res) => {
        try {
            const id = req.params.id
            const body = req.body
            CatModel.editCat(body, id)
                .then((result) => {
                    redisClient.del('category')
                    response.success(res, result, 'Updated')
                }).catch((err) => {
                    response.failed(err.message)
                })
        } catch (err) {
            response.failed(err.message)
        }
    },
    delCat: async (req, res) => {
        try {
            const id = req.params.id
            const data = await CatModel.delCat(id)
            redisClient.del('category')
            response.success(res, data, 'Deleted')
        } catch (err) {
            response.failed(err.message)
        }
    }
}

module.exports = category