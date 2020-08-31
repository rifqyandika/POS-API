const express = require('express')
const productModel = require('../models/product')
const response = require('../helper/res')

const product = {
    getProduct: async (req, res) => {
        try {
            const name = !req.query.search ? '': req.query.search
            const sort = !req.query.sortBy ? 'id_product' : req.query.sortBy
            const type = !req.query.type ? 'asc': req.query.type
            const data = await productModel.getProduct(name, sort, type).then(res => res)
            response.success(res, data, 'success')
        } catch (err) {
            response.failed(res, [], err.message)
        }
    }, 
    addProduct: async (req, res) => {
        try {
            const data = req.body
            await productModel.addProduct(data)
            response.success(res, data, 'add product success')
        } catch (err) {
            response.failed(res, [], err.message)
        }
    },
    editProduct: async (req, res) => {
        try {
            const id = req.params.id
            const data = req.body
            const result = await productModel.editProduct(data, id)
            response.success(res, result, 'update success')
        } catch (err) {
            response.failed(res, err.message)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id
            const data = await productModel.deleteProduct(id)
            response.success(res, data, 'Delete Product success')
        } catch (err) {
            response.failed(err.message)
        }
    }
}

module.exports = product
