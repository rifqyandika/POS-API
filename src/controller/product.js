const express = require('express')
const productModel = require('../models/product')
const response = require('../helper/res')
require('../helper/cloud')

const product = {
   getProduct: async (req, res) => {
      try {
         const name = !req.query.search ? '' : req.query.search
         const sort = !req.query.sortBy ? 'id_product' : req.query.sortBy
         const type = !req.query.type ? 'asc' : req.query.type
         const limit = !req.query.limit ? 10 : req.query.limit
         const page = !req.query.page ? 1 : parseInt(req.query.page)
         const offset = page === 1 ? 0 : (page - 1) * limit
         productModel.getProduct(name, sort, type, limit, offset)
            .then((result) => {
               const row = result[0].count
               const meta = {
                  totalItem: row,
                  totalPage: Math.ceil(row/limit),
                  page
               }
               response.meta(res, result, meta, 'success')
            })
            .catch((err) => {
               response.failed(res, [], err.message)
            })
      } catch (err) {
         response.failed(res, [], 'Server Internal Error')
      }
   },
   addProduct: (req, res) => {
      try {
         const data = req.body
         // const { url } = await cloudinary.v2.uploader.upload(req.file.path)
         body = req.file.filename
         productModel.addProduct(data, body)
            .then((result) => {
               response.success(res, result, 'add product success')
            })
            .catch((err) => {
               response.failed(res, [], err.message)
            })
      } catch (err) {
         response.failed(res, [], 'Server Internal Error')
      }
   },
   editProduct: async (req, res) => {
      try {
         const id = req.params.id
         const data = req.body
         data.image = !req.file? req.file : req.file.filename
         productModel.editProduct(data, id)
            .then((result) => {
               response.success(res, result, 'update success')
            })
            .catch((err) => {
               response.failed(res, [], err.message)
            })
      } catch (err) {
         response.failed(res, [], err.message)
      }
   },
   deleteProduct: async (req, res) => {
      try {
         const id = req.params.id
         productModel.deleteProduct(id)
            .then((result) => {
               response.success(res, result, 'Delete Product success')
            })
            .catch((err) => {
               response.failed(res, [], err.message)
            })
      } catch (err) {
         response.failed(res, [], 'Server Internal Error')
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
