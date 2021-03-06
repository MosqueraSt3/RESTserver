'use strict'

const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

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

        // File Upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use('/api/auth', require('../routes/auth.routes'))
        this.app.use('/api/user', require('../routes/user.routes'))
        this.app.use('/api/category', require('../routes/category.routes'))
        this.app.use('/api/item', require('../routes/item.routes'))
        this.app.use('/api/search', require('../routes/search.routes'))
        this.app.use('/api/uploads', require('../routes/uploads.routes'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`||ON|| ${this.port}`)
        })
    }
}

module.exports = Server