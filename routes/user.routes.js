'use strict'

const { Router } = require('express')
const { listUser,upsertUser,getUser,deleteUser } = require('../controller/user.controller')

const router = Router()

router.get('/', listUser)
router.post('/', upsertUser)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)

module.exports = router