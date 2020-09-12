const response = require('../helper/res')
const userModel =  require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Users = {
    register: async (req, res) => {
        const body = req.body
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const generate = await bcrypt.hash(password, salt)
        userModel.register(body, generate)
        .then((result) => {
            response.success(res, result, 'success')
        }).catch((err) => {
            response.failed(res, [], 'user already exist')
        })
    },
    login: async (req, res) => {
        const body = req.body
        userModel.login(body)
        .then(async (result) => {
            const data = result[0]
            const pass = data.password
            const password =  req.body.password
            const isMatch = await bcrypt.compare(password, pass)
            if(!isMatch){
                response.failed(res, [], 'Password invalid')
            }else{
                const id = result[0].id
                jwt.sign({
                    id: data.id
                }, '123', { expiresIn: 3600 }, (err, token) => {
                    if(err){
                        response.failed(res, [], 'Token invalid');
                    }else{
                        response.success(res, {token: token}, 'Login success')
                    }
                })
            }
        }).catch((err) => {
            response.failed(res, [], 'Email invalid')
        })
    }
}

module.exports = Users