'use strict'

const { Item } = require('../models')

const listItem = async (req, res) => {
    const { limit = 5, from = 0 } = req.query
    const [ total, items ] = await Promise.all([
        Item.countDocuments({ status: true }),
        Item.find({ status: true })
            .populate('category', 'name')
            .populate('user', 'name')
            .skip(Number( from ))
            .limit(Number( limit ))
    ])
    res.send({
        total,
        items
    })
}

const updateItem = async (req, res) => {
    const { id } = req.params
    const { status,user,...bodyItem } = req.body

    if (bodyItem.name) {
        bodyItem.name = bodyItem.name.toUpperCase()
    }

    bodyItem.user = req.user._id

    const item = await Item.findByIdAndUpdate(id, bodyItem, {new: true})
    res.send(item)
}

const upsertItem = async (req, res) => {    

    const {status,user,...bodyItem} = req.body

    const { name } = bodyItem 
    bodyItem.name = name.toUpperCase()

    const itemAlreadyExist = await Item.findOne( {name} )

    if (itemAlreadyExist) {
        return res.status(400).json({
            msg: 'Item already exists on DB'
        })
    }

    const data = {
        ...bodyItem,
        user: req.user._id
    }

    const item = new Item( data )
    
    // SAVE ON DB
    await item.save()

    // RESPONSE
    res.send(item)
}

const getItem = async (req, res) => {
    const { id } = req.params
    const item = await Item.findById( id )
        .populate('category', 'name')
        .populate('user', 'name')
    res.send(item)
}

const deleteItem = async (req, res) => {
    const { id } = req.params

    // THE BEST WAY TO DELETE USERS
    const item = await Item.findByIdAndUpdate( id, {status: false}, {new: true})
        .populate('category', 'name')
        .populate('user', 'name')
    const userAuth = req.user
    res.json({
        item,
        userAuth
    })
}

module.exports = {
    listItem,
    updateItem,
    upsertItem,
    getItem,
    deleteItem
}