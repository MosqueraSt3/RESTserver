'use strict'

const bcrypt = require('bcryptjs')

const User = require('../models/user')

const listUser = async (req, res) => {
    const { limit = 5, from = 0 } = req.query
    const [ total, users ] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true })
            .skip(Number( from ))
            .limit(Number( limit ))
    ])
    res.send({
        total,
        users
    })
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { _id,password,google,email,...bodyUser } = req.body

    // IF PASSWORD != NULL THAT MEANS UPDATE PASSWORD
    if ( password ) {
        // CRYPT
        const salt = bcrypt.genSaltSync()
        bodyUser.password = bcrypt.hashSync( password,salt )
    }

    const user = await User.findByIdAndUpdate(id, bodyUser, {new: true})
    res.send(user)
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

const getUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById( id )
    res.send(user)
}

const deleteUser = (req, res) => {
    const { id } = req.params

    // DELETE FROM DB
    // const user = await User.findByIdAndDelete( id )

    // THE BEST WAY TO DELETE USERS
    const user = await User.findByIdAndUpdate( id, {status: false}, {new: true})

    res.send(user)
}

module.exports = {
    listUser,
    updateUser,
    upsertUser,
    getUser,
    deleteUser
}