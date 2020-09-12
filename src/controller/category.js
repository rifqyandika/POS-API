const CatModel = require('../models/category')
const response = require('../helper/res')

const category = {
    getCat: (req, res) => {
        try {
            const search = !req.query.search ? '' : req.query.search
            const sort = !req.query.sortBy ? 'id_category' : req.query.sortBy
            const type = !req.query.type ? 'asc' : req.query.type
            const limit = !req.query.limit ? 3 : req.query.limit
            const page = !req.query.page ? 1 : req.query.page
            const offset = page === 1 ? 0 : (page - 1) * limit
            CatModel.getCat(search, sort, type, limit, offset)
                .then(result => {
                    const row = result[0].count
                    const meta = {
                        totalItem: row,
                        totalPage: Math.ceil(row/limit),
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
    addCat: async (req, res) => {
        try {
            const body = req.body
            const data = await CatModel.addCat(body)
            response.success(res, data, 'added')
        } catch (err) {
            response.failed(err.message)
        }
    },
    editCat: async (req, res) => {
        try {
            const id = req.params.id
            const body = req.body
            const data = await CatModel.editCat(body, id)
            response.success(res, data, 'Updated')
        } catch (err) {
            response.failed(err.message)
        }
    },
    delCat: async (req, res) => {
        try {
            const id = req.params.id
            const data = await CatModel.delCat(id)
            response.success(res, data, 'Deleted')
        } catch (err) {
            response.failed(err.message)
        }
    }
}

module.exports = category