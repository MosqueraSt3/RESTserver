'use strict'

const jwt = require('jsonwebtoken')
const { config } = require('../config/config')

const JWTgen = ( uid ) => {
    return new Promise ((res,rej) => {
        const payload = { uid } 
        jwt.sign( payload, config.apiKey, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.error(err)
                rej('Can not generate token')
            } else {
                res( token )
            }
        })
    })
}

module.exports = {
    JWTgen
}