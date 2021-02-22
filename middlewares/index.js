'use strict'

const validateJson = require('../middlewares/validate-json')
const validateJWT = require('../middlewares/validate-jwt')
const validateRoles = require('../middlewares/validate-roles')
const validateFile = require('../middlewares/validate-file')

module.exports = {
    ...validateJson,
    ...validateJWT,
    ...validateRoles,
    ...validateFile
}