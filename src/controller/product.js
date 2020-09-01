const express = require('express')
const productModel = require('../models/product')
const response = require('../helper/res')
require('../helper/cloud')
const cloudinary = require('cloudinary')

const product = {
    getProduct: async (req, res) => {
        try {
            const name = !req.query.search ? '': req.query.search
            const sort = !req.query.sortBy ? 'id_product' : req.query.sortBy
            const type = !req.query.type ? 'asc': req.query.type
            const limit = !req.query.limit ? 10: req.query.limit
            const page = !req.query.page ? 1: parseInt(req.query.page)
            const offset = page===1?0:(page-1) * limit
            const data = await productModel.getProduct(name, sort, type, limit, offset).then(res => res)
            response.success(res, data, 'success')
        } catch (err) {
            response.failed(res, [], err.message)
        }
    }, 
    addProduct: async (req, res) => {
        try {
            const data = req.body
            const { url } = await cloudinary.v2.uploader.upload(req.file.path)
            await productModel.addProduct(data, url)
            console.log(data);
            response.success(res, data, 'add product success')
        } catch (err) {
            response.failed(res, [], err.message)
        }
    },
    editProduct: async (req, res) => {
        try {
            const id = req.params.id
            const data = req.body
            console.log(id, data.image_product);
            // const result = await productModel.editProduct(data, id)
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
            response.failed(res, [], err.message)
        }
    }, 
    detailProduct: async (req, res) => {
        try {
            const id = req.params.id
            const data = await productModel.detailProduct(id)
            response.success(res, data, 'Success detail Product')
        } catch (err) {
            response.failed(res, [], err.message)
        }

    }
}

module.exports = product
