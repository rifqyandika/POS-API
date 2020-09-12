const response = require('../helper/res')
const auth = require('./auth')

const authBody = (req, res, next) => {
    const { email, password } = req.body
    if(email === undefined || email === ''){
        response.failed(res, [], 'please input email')
    }else if(password < 6){
        response.failed(res, [], 'password wajib 6')
    }else{
        next()
    }
}

module.exports = authBody