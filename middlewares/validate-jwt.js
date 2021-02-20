'use strict'

const jwt = require('jsonwebtoken')

const User = require('../models/user')

const { config } = require('../config/config')

const validateJWT = async (req,res,next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            msg: 'unauthorized'
        })
    }

    try {
        const { uid } = jwt.verify(token,config.apiKey)
        const user = await User.findById( uid )

        if (!user) {
            return res.status(401).json({
                msg: 'unauthorized'
            })
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'unauthorized'
            })
        }
        req.user= user
        next()
    } catch (err) {
        console.error(err)
        res.status(401).json({
            msg: 'unauthorized'
        })
    }
}

module.exports = {
    validateJWT
}