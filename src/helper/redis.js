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
                // const output = _.filter(newData, (obj) => {
                //     return obj.name.includes(search)
                // })
                // const output = _.orderBy(newData, [sort], [type])

                // response.success(res, output, 'redis search')
            }else{
                next()
            }
        })
    }
}