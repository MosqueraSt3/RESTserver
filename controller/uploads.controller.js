'use strict'

const path = require('path')
const fs = require('fs')

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
    getImage
}