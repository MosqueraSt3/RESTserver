'use strict'

const Role = require('../models/role')
const User = require('../models/user')

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

module.exports = {
    isRoleValidate,
    isEmailExist
}