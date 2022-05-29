const express = require('express')
const route  = express.Router()
const AuthController = require('../controller/AuthController')
const { body } = require('express-validator');


route.post('/login', AuthController.logIn)
route.post('/register',
    body('name').notEmpty().withMessage("Username can not be empty"),
    body('email').isEmail().withMessage("Not a valid Email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
 AuthController.register)

module.exports = route