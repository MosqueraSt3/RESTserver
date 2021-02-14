'use strict'

const express = require('express')
const cors = require('cors')
const { config } = require('../config/config')

class Server{

    constructor(){
        this.app = express()
        this.port = config.port

        //Middlewares
        this.middlewares()
        
        // Routes
        this.routes()
    }

    middlewares(){
        // CORS 
        this.app.use( cors() )

        // PARSER
        this.app.use( express.json() )

        // Public Directory
        // this.app.use( express.static('public') )
    }

    routes(){
        this.app.use('/user', require('../routes/user.routes'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`||ON|| ${this.port}`)
        })
    }
}

module.exports = Server