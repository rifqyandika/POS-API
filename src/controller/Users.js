const response = require("../helper/res");
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
require('dotenv')

const Users = {
    register: async (req, res) => {
        const body = req.body;
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const generate = await bcrypt.hash(password, salt);
        jwt.sign({ email: body.email }, process.env.SECRET, { expiresIn: 1440 }, (err, token) => {
            if (err) {
                response.failed(res, [], err.message);
            } else {
                const output = `
        <center><h1>HELLO ${req.body.email}</h1>
        <h3>Thank you for registration</h3>
        <h4>You can confirm your email by clicking the button below <br> '${process.env.HOST}${token}'</h4></center>
        `
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: process.env.USEREMAIL,
                        pass: process.env.USERPASS
                    }
                });

                let Mail = {
                    from: '"maxmukiper.com" <maxmukiper.com>',
                    to: req.body.email,
                    subject: "Verification Email",
                    text: "Plaintext version of the message",
                    html: output
                };
                transporter.sendMail(Mail);
            }
        });
        userModel
            .register(body, generate)
            .then((result) => {
                response.success(res, result, "Please check your email to activation");
            })
            .catch((err) => {
                response.failed(res, [], "user already exist");
            });
    },
    login: async (req, res) => {
        const body = req.body;
        userModel
            .login(body)
            .then(async (result) => {
                const data = result[0];
                const pass = data.password;
                const password = req.body.password;
                const isMatch = await bcrypt.compare(password, pass);
                if (data.status === 0) {
                    response.failed(res, [], "Please activation your email");
                } else {
                    if (!isMatch) {
                        response.failed(res, [], "Password invalid");
                    } else {
                        const id = result[0].id;
                        const level = result[0].level
                        const refresh = result[0].refreshToken
                        if (!refresh) {
                            const refreshToken = jwt.sign({ id: id }, process.env.SECRET)
                            userModel.refreshToken(refreshToken, id)
                            jwt.sign({ id: id, level: level }, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
                                if (err) {
                                    response.failed(res, [], err.message);
                                } else {
                                    response.success(res, { id_user: id ,token: token, refresh: refreshToken }, "Login success");
                                }
                            });
                        } else {
                            jwt.sign({ id: id, level: level }, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
                                if (err) {
                                    response.failed(res, [], err.message);
                                } else {
                                    response.success(res, { id_user: id, token: token, refresh: result[0].refreshToken }, "Login success");
                                }
                            });
                        }

                    }
                }
            })
            .catch((err) => {
                response.failed(res, [], "Email invalid");
            });
    },
    refresh: (req, res) => {
        const token = req.body.token
        const decod = jwt.decode(token)
                jwt.sign({ id: decod.id }, process.env.SECRET, { expiresIn: 1440 }, (err, tok) => {
                    if (err) {
                        console.log(err);
                    } else {
                        response.success(res, { Newtoken: tok }, 'New Token',)
                    }
                })
    },
    verify: (req, res) => {
        const token = req.params.token
        jwt.verify(token, process.env.SECRET, (err, decode) => {
            if (err) {
                console.log(err);
            } else {
                const data = jwt.decode(token)
                const email = data.email
                userModel.update(email).then((result) => {
                    response.success(res, [], 'Succes Activation')
                }).catch(err => {
                    response.failed(res, [], 'Failed Activation')
                })
            }
        })
    },
    deleteUser: (req, res) => {
        const id = req.params.id
        userModel.deleteUser(id)
            .then((result) => {
                response.success(res, [], 'user deleted')
            }).catch((err) => {
                response.failed(res, [], err.message)
            })
    },
    logoutUser: (req, res) => {
        const id = req.params.id
        userModel.logoutUser(id)
            .then((result) => {
                response.success(res, [], 'user logout')
            }).catch((err) => {
                response.failed(res, [], err.message)
            })
    }
};

module.exports = Users;
