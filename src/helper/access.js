const jwt = require('jsonwebtoken')
require('dotenv')
const response = require("../helper/res");

const access = {
    accesAdmin : (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, process.env.SECRET, (err, decode) => {
            if(err){
                console.log(err);
            }else {
                const level = decode.level
                if(level == 1){
                    response.success(res, [], 'kamu admin')
                }else {
                    next()
                }
            }
        })
    }
}

module.exports = access