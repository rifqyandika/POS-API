const bcrypt = require('bcrypt');
const response = require('../helper/res')
const jwt = require('jsonwebtoken');

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
            if(err && err.name === "TokenExpiredError"){
                const decod = jwt.decode(token).id
                jwt.sign({id: decod.id}, '123', { expiresIn: 1000 }, (err, tok) => {
                    if(err){
                        console.log(err);
                    }else{
                        response.success(res, {token: tok}, 'New Token', )
                    }
                })
            }else if(err && err.name === "JsonWebTokenError"){
                response.failed(res, [], 'Token Invalid')
            }
            else {
                next()
            }
        })
    }
}

module.exports = auth