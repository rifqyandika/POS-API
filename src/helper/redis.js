const redis = require('redis')
const redisClient = redis.createClient()
const response = require('../helper/res')

module.exports= {
    getProduct : (req, res, next) => {
        redisClient.get('product', (err, data) => {
            if(data){
                const newData = JSON.parse(data)
                response.success(res, newData, 'success')
            }else{
                next()
            }
        })
    }
}