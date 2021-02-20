'use strict'

const { Schema, model } = require('mongoose')

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.toJSON = function() {
    const { __v,password,_id,...user } = this.toObject()
    user.uid = _id
    return user
}

module.exports = model( 'User' , userSchema)