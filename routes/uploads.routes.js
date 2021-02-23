'use strict'

const { Router } = require('express')
const { check } = require('express-validator')

const { fileUpload, updateFile, getImage, updateFileCloudinary } = require('../controller/uploads.controller')
const { collectionsAllowed } = require('../helpers/db-validators')
const { validateFile,validateJson } = require('../middlewares')

const router = Router()

router.post('/', validateFile ,fileUpload)

router.put('/:collection/:id', [
    validateFile,
    check('id', 'Invalid Id').isMongoId(),
    check('collection').custom( c => collectionsAllowed(c, ['user', 'item'])),
    validateJson
],updateFileCloudinary)

router.get('/:collection/:id', [
    validateFile,
    check('id', 'Invalid Id').isMongoId(),
    check('collection').custom( c => collectionsAllowed(c, ['user', 'item'])),
    validateJson
], getImage)

module.exports = router
