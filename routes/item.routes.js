'use strict'

const { Router } = require('express')
const { check } = require('express-validator')

const {validateJson,validateJWT,hasRole,isAdmin} = require('../middlewares')
const { isRoleValidate,isEmailExist, isUserExist, isCategoryExist, isItemExist } = require('../helpers/db-validators')

const { listItem,updateItem,upsertItem,getItem,deleteItem } = require('../controller/item.controller')


const router = Router()

router.get('/', listItem)
router.put('/:id', [
    validateJWT,
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom( isItemExist ),
    validateJson
], updateItem)
router.post('/', [
  validateJWT,
  check('name', 'Invalid Name').not().isEmpty(),
  check('category', 'Invalid Category').not().isEmpty(),
  check('category').custom( isCategoryExist ),
  validateJson
], upsertItem)
router.get('/:id', [
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom( isItemExist ),
    validateJson
], getItem)
router.delete('/:id', [
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom( isItemExist ),
    validateJson
],deleteItem)


module.exports = router
