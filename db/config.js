'use strict'

const mongoose = require('mongoose')

const { config } = require('../config/config')

const dbConnection = async () => {
    try {
        await mongoose.connect( config.dbHost, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        } )

        console.log('||DB||ON')
    } catch (err) {
        console.error(err.message)
        throw new Error('||Error DB||')
    }
}

module.exports = {
    dbConnection
}