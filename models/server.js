'use strict'

const express = require('express')
const cors = require('cors')
const { config } = require('../config/config')
const { dbConnection } = require('../db/config')

class Server{

    constructor(){
        this.app = express()
        this.port = config.port

        // Connect to DB
        this.connectDB()

        //Middlewares
        this.middlewares()
        
        // Routes
        this.routes()
    }

    async connectDB(){
        // SHOULD VALIDATE NODE_ENV
        await dbConnection()
    }

    middlewares(){
        // CORS 
        this.app.use( cors() )

        // PARSER
        this.app.use( express.json() )

        // Public Directory
        this.app.use( express.static('public') )
    }

    routes(){
        this.app.use('/api/auth', require('../routes/auth.routes'))
        this.app.use('/api/user', require('../routes/user.routes'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`||ON|| ${this.port}`)
        })
    }
}

module.exports = Server