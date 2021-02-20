'use strict'

const bcrypt = require('bcryptjs')
const { JWTgen } = require('../helpers/gen-jwt')

const User = require('../models/user')

const login = async (req,res) => {

    const { email, password } = req.body

    try {
        // IF EMAIL EXIST
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: "Invalid user / password"
            })
        }

        // IF USER IS ACTIVE
        if (!user.status) {
            return res.status(400).json({
                msg: "Inactive User"
            })
        }

        // VALIDATE PASSWORD
        const checkPassword = bcrypt.compareSync( password, user.password)
        if (!checkPassword) {
            return res.status(400).json({
                msg: "Invalid user / password"
            })
        }

        // JWT
        const token = await JWTgen( user.id )

        res.json({
            user,
            token
        })
        
    } catch (err) {
        return console.error(err);
    }
}

module.exports = {
    login
}