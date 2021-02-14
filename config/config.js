'use strict'

require('dotenv').config()

const config = {
    env: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    apiUrl: process.env.API_URL || 'http://localhost:',
    apiHost: process.env.API_HOST || 'localhost',
    cors: process.env.CORS,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD
}

module.exports = { config }