const bcrypt = require('bcrypt');
const response = require('../helper/res')
const jwt = require('jsonwebtoken');
require('dotenv')

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
        jwt.verify(token, process.env.SECRET,(err, decoded) => {
            if(err && err.name === "TokenExpiredError"){
                response.failed(res, [], 'Token Expired')
            }else if(err && err.name === "JsonWebTokenError"){
                response.failed(res, [], err.message)
            }
            else {
                next()
            }
        })
    }
}

module.exports = auth