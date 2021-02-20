'use strict'

const { Router } = require('express')
const { check } = require('express-validator')

const {validateJson,validateJWT,hasRole,isAdmin} = require('../middlewares')

const { listUser,updateUser,upsertUser,getUser,deleteUser } = require('../controller/user.controller')
const { isRoleValidate,isEmailExist, isUserExist } = require('../helpers/db-validators')

const router = Router()

router.get('/', listUser)
router.put('/:id',[
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom( isUserExist ),
    check('role').custom( isRoleValidate ),
    validateJson
], updateUser)
router.post('/', [
    check('name', 'Invalid Name').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('email').custom( isEmailExist ),
    check('password', 'Invalid Password').isLength({ min: 6 }),
    // check('role', 'Invalid Role').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( isRoleValidate ),
    validateJson
],upsertUser)
router.get('/:id',[
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom( isUserExist ),
    validateJson
],getUser)
router.delete('/:id',[
    validateJWT,
    // isAdmin, HAVE TO BE ADMIN TO TO SOMETHING
    hasRole('ADMIN_ROLE','SUPER_ROLE'),
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom( isUserExist ),
    validateJson
],deleteUser)

module.exports = router