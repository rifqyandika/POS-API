const express = require('express')
const productModel = require('../models/product')
const response = require('../config/res')

const product = {
    getProduct: async (req, res) => {
        try {
            const name = !req.query.search ? '': req.query.search
            const data = await productModel.getProduct(name).then(res => res)
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
            // console.log(date);
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
