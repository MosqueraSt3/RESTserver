'use strict'

const { Router } = require('express')
const { check } = require('express-validator')

const {validateJson,validateJWT,hasRole,isAdmin} = require('../middlewares')
const { isRoleValidate,isEmailExist, isUserExist, isCategoryExist } = require('../helpers/db-validators')

const { listCategory,updateCategory,upsertCategory,getCategory,deleteCategory } = require('../controller/category.controller')


const router = Router()

router.get('/', listCategory)
router.put('/:id', [
    validateJWT,
    check('name', 'Invalid Name').not().isEmpty(),
    check('id').custom( isCategoryExist ),
    validateJson
], updateCategory)
router.post('/', [
  validateJWT,
  check('name', 'Invalid Name').not().isEmpty(),
  validateJson
], upsertCategory)
router.get('/:id', [
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom( isCategoryExist ),
    validateJson
], getCategory)
router.delete('/:id', [
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom( isCategoryExist ),
    validateJson
],deleteCategory)


module.exports = router
