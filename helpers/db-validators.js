'use strict'

const { Collection } = require('mongoose')
const { Category, Role, User, Item } = require('../models')

const isRoleValidate = async (role = '') => {
    const existRole = await  Role.findOne({ role })
    if (!existRole) {
        throw new Error(`Role ${role} doesn't match with database`)
    }
}

const isEmailExist = async (email = '') => {
    const alreadyExistEmail = await User.findOne({ email })
        if ( alreadyExistEmail ) {
            throw new Error(`Email already exists on database`)
        }
}

const isUserExist = async (id = '') => {
    const alreadyExistUser = await User.findById( id )
        if ( !alreadyExistUser ) {
            throw new Error(`User ${ id } doesn't exist on database`)
        }
}

const isCategoryExist = async (id = '') => {
    const alreadyExists = await Category.findById( id )
    if (!alreadyExists) {
        throw new Error(`Category ${id} doesn't exist on databasee`)
    }
}

const isItemExist = async (id = '') => {
    const alreadyExists = await Item.findById( id )
    if (!alreadyExists) {
        throw new Error(`Item ${id} doesn't exist on databasee`)
    }
}

const collectionsAllowed = async(collection = '', collections = []) => {
    const include = collections.includes( collection )
    if (!include) {
        throw new Error('Invalid Collection')
    }

    return true
}

module.exports = {
    isRoleValidate,
    isEmailExist,
    isUserExist,
    isCategoryExist,
    isItemExist,
    collectionsAllowed
}