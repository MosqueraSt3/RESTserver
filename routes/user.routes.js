'use strict'

const { Router } = require('express')
const { check } = require('express-validator')

const { listUser,upsertUser,getUser,deleteUser } = require('../controller/user.controller')
const { isRoleValidate,isEmailExist } = require('../helpers/db-validators')
const { validateJson } = require('../middlewares/validate-json')

const router = Router()

router.get('/', listUser)
router.post('/', [
    check('name', 'Invalid Name').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('email').custom( isEmailExist ),
    check('password', 'Invalid Password').isLength({ min: 6 }),
    // check('role', 'Invalid Role').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( isRoleValidate ),
    validateJson
],upsertUser)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)

module.exports = router