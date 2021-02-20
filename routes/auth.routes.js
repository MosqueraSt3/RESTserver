'use strict'

const { Router } = require('express')
const { check } = require('express-validator')

const { login } = require('../controller/auth.controller')
const { validateJson } = require('../middlewares/validate-json')

const router = Router()

router.post('/login', [
    check('email', ['the mail is mandatory']).isEmail(),
    check('password', ['the password is mandatory']).not().isEmpty(),
    validateJson
],login)

module.exports = router
