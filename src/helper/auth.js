const bcrypt = require('bcrypt');
const response = require('../helper/res')
const jwt = require('jsonwebtoken')

const auth = {
    authentication: (req, res, next) => {
        const token = req.headers.token
        if(!token){
            response.failed(res, [], 'access denied')
        }else{
            next()
        }
    },
    authorizatin: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, '123',(err, decoded) => {
            if(err){
                response.failed(res, [], 'invalid token')
            }else {
                next()
            }
        })
    }
}

module.exports = auth