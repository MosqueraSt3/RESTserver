'use strict'

const { ObjectId } = require('mongoose').Types
const {User,Category,item} = require('../models')

const collections = [ 
    'user',
    'category',
    'item'
]

const searchUser = async(req,res) => {
    const isMongoId = ObjectId.isValid( term )
    if (isMongoId) {
        const user = await User.findById( term )
        return res.json({
            result: ( user ) ? [user] : []
        })
    }

    const regex = new RegExp( term, 'i' )

    const users = await User.find({
        $or: [
            {name: regex},
            {email: regex}
        ],
        $and: [{status: true}]
    })
    return res.json({
        result: ( users ) ? [users] : []
    })
}

const searchCategory = async(req,res) => {
    const isMongoId = ObjectId.isValid( term )
    if (isMongoId) {
        const category = await Category.findById( term )
        return res.json({
            result: ( category ) ? [category] : []
        })
    }

    const regex = new RegExp( term, 'i' )

    const categories = await Category.find({name: regex, status: true})
    return res.json({
        result: ( categories ) ? [categories] : []
    })
}

const searchItem = async(req,res) => {
    const isMongoId = ObjectId.isValid( term )
    if (isMongoId) {
        const item = await Item.findById( term ).populate('category', 'name')
        return res.json({
            result: ( item ) ? [item] : []
        })
    }

    const regex = new RegExp( term, 'i' )

    const items = await Item.find({name: regex, status: true}).populate('category', 'name')
    return res.json({
        result: ( items ) ? [items] : []
    })
}

const search = (req,res) => {
    const { collection, term } = req.params

    if(!collections.includes(collection)){
        res.status(400).json({
            msg: 'error'
        })
    }

    switch (collection) {
        case 'user':
            searchUser(term, res)
            break;
        case 'category':
            searchCategory(term, res)
            break;
        case 'item':
            searchItem(term, res)
            break;
    
        default:
            res.status(500).json({
                msg: 'error switch'
            })
            break;
    }
    res.send('searching...')
}

module.exports = {
    search
}