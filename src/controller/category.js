const CatModel = require('../models/category')
const response = require('../helper/res')

const category = {
    getCat: async (req, res) => {
        try {
            const data = await CatModel.getCat().then(result => result)
            response.success(res, data, 'Success')
        } catch (err) {
            console.log('Server Internal error');
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