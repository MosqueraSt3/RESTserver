'use strict'

const { Router } = require('express')
const { search } = require('../controller/search.controller')

const router = Router()

router.get('/:collection/:term', search)


module.exports = router