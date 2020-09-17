const redis = require('redis')
const redisClient = redis.createClient()
const response = require('../helper/res')
const _ = require('lodash')

module.exports= {
    getCat : (req, res, next) => {
        redisClient.get('category', (err, data) => {
            if(data){
                const newData = JSON.parse(data)
            response.success(res, newData, 'success')
            }else{
                next()
            }
        })
    }
}