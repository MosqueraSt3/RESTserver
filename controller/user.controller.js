'use strict'

const bcrypt = require('bcryptjs')

const User = require('../models/user')

const listUser = (req, res) => {
    res.send('Hello World Controller')
}

const upsertUser = async (req, res) => {    

    const { name,email,password,role } = req.body
    const user = new User( {name,email,password,role} )

    // CRYPT
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync( password, salt )
    
    // SAVE ON DB
    await user.save()

    // RESPONSE
    res.send(user)
}

const getUser = (req, res) => {
    res.send(req.params.id)
}

const deleteUser = (req, res) => {
    res.send(req.params.id)
}

module.exports = {
    listUser,
    upsertUser,
    getUser,
    deleteUser
}