const redis = require('redis')
const redisClient = redis.createClient()
const response = require('../helper/res')
const _ = require('lodash')

module.exports= {
    getProduct : (req, res, next) => {
        redisClient.get('product', (err, data) => {
            if(data){
                const newData = JSON.parse(data)
                const search = !req.query.search ? "" : req.query.search;
                const sort = !req.query.sortBy ? "id_product" : req.query.sortBy;
                const type = !req.query.type ? "asc" : req.query.type;
                const limit = !req.query.limit ? 10 : req.query.limit;
                const page = !req.query.page ? 1 : parseInt(req.query.page);
                const start = (page - 1) * limit
                const end = page * limit
                const sortData = _.orderBy(newData, [sort], [type])
                let dataRedis = sortData
                if(sort !== null){
                    const sr = sortData.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
                    dataRedis = sr
                }
                res.send({
                    message: 'get redis',
                    code: 200,
                    success: true,
                    meta: {
                        totalRow: dataRedis.length,
                        totalPage: Math.ceil(dataRedis.length/ limit),
                        page
                    },
                    data: dataRedis.slice(start, end)
                })
            }else{
                next()
            }
        })
    },
    getCat : (req, res, next) => {
        redisClient.get('category', (err, data) => {
            if(data){
                const newData = JSON.parse(data)
                const search = !req.query.search ? "" : req.query.search;
                const sort = !req.query.sortBy ? "id_category" : req.query.sortBy;
                const type = !req.query.type ? "asc" : req.query.type;
                const limit = !req.query.limit ? 10 : req.query.limit;
                const page = !req.query.page ? 1 : parseInt(req.query.page);
                const start = (page - 1) * limit
                const end = page * limit
                const sortData = _.orderBy(newData, [sort], [type])
                let dataRedis = sortData
                if(sort !== null){
                    const sr = sortData.filter(e => e.category.toLowerCase().includes(search.toLowerCase()))
                    dataRedis = sr
                }
                res.send({
                    message: 'Data Category from redis',
                    code: 200,
                    success: true,
                    meta: {
                        totalRow: dataRedis.length,
                        totalPage: Math.ceil(dataRedis.length/ limit),
                        page
                    },
                    data: dataRedis.slice(start, end)
                })
            }else{
                next()
            }
        })
    },
    getHis : (req, res, next) => {
        redisClient.get('history', (err, data) => {
            if(data){
                const newData = JSON.parse(data)
                const search = !req.query.search ? "" : req.query.search;
                const sort = !req.query.sortBy ? "id" : req.query.sortBy;
                const type = !req.query.type ? "asc" : req.query.type;
                const limit = !req.query.limit ? 10 : req.query.limit;
                const page = !req.query.page ? 1 : parseInt(req.query.page);
                const start = (page - 1) * limit
                const end = page * limit
                const sortData = _.orderBy(newData, [sort], [type])
                let dataRedis = sortData
                if(sort !== null){
                    const sr = sortData.filter(e => e.cashier.toLowerCase().includes(search.toLowerCase()))
                    dataRedis = sr
                }
                res.send({
                    message: 'Data History from redis',
                    code: 200,
                    success: true,
                    meta: {
                        totalRow: dataRedis.length,
                        totalPage: Math.ceil(dataRedis.length/ limit),
                        page
                    },
                    data: dataRedis.slice(start, end)
                })
            }else{
                next()
            }
        })
    }
}