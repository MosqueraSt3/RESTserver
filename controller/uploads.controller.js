'use strict'

const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.cloudinaryUrl )

const { uploadFileHelper } = require("../helpers/upload-file");

const { User,Item } = require('../models')

const fileUpload = async(req,res) => {
    try {
        const pathFile = await uploadFileHelper(req.files, ['txt', 'md'], 'texts')
        res.send(pathFile)
    } catch (error) {
        console.error(error)
    }
}

const updateFile = async(req,res) => {
    const { id, collection } = req.params

    let model

    switch ( collection ) {
        case user:
            model = await User.findById(id)
            if (!model) {
                return res.status(400).send('Doesnt exist on db')
            }
            break;

        case item:
            model = await Item.findById(id)
            if (!model) {
                return res.status(400).send('Doesnt exist on db')
            }
            break;
    
        default:
            return res.status(500).send('server internal error')
    }

    if (model.img) {
        const pathImg = path.join( __dirname, '../uploads', collection, model.img )
        if (fs.existsSync( pathImg )) {
            fs.unlinkSync( pathImg )
        }
    }

    const nameFile = await uploadFileHelper(req.files, undefined , collection)
    model.img = nameFile

    await model.save()

    res.send(model)
}

const updateFileCloudinary = async(req,res) => {
    const { id, collection } = req.params

    let model

    switch ( collection ) {
        case user:
            model = await User.findById(id)
            if (!model) {
                return res.status(400).send('Doesnt exist on db')
            }
            break;

        case item:
            model = await Item.findById(id)
            if (!model) {
                return res.status(400).send('Doesnt exist on db')
            }
            break;
    
        default:
            return res.status(500).send('server internal error')
    }

    if (model.img) {
        const nameArr = model.img.split('/')
        const name = nameArr[ nameArr.length - 1 ]
        const { public_id } = name.split('.')
        cloudinary.uploader.destroy( public_id )
    }
    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
    model.img = secure_url
    await model.save()

    res.send(model)
}

const getImage = async(req,res) => {
    const { id, collection } = req.params

    let model

    switch ( collection ) {
        case user:
            model = await User.findById(id)
            if (!model) {
                return res.status(400).send('Doesnt exist on db')
            }
            break;

        case item:
            model = await Item.findById(id)
            if (!model) {
                return res.status(400).send('Doesnt exist on db')
            }
            break;
    
        default:
            return res.status(500).send('server internal error')
    }

    if (model.img) {
        const pathImg = path.join( __dirname, '../uploads', collection, model.img )
        if (fs.existsSync( pathImg )) {
            res.sendFile( pathImg )
        }
    }

    res.send('no hay imagen')
}

module.exports = {
    fileUpload,
    updateFile,
    getImage,
    updateFileCloudinary
}