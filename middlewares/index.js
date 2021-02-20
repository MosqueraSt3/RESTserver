'use strict'

const validateJson = require('../middlewares/validate-json')
const validateJWT = require('../middlewares/validate-jwt')
const validateRoles = require('../middlewares/validate-roles')

module.exports = {
    ...validateJson,
    ...validateJWT,
    ...validateRoles
}