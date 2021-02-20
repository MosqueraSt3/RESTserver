'use strict'

const { Category } = require('../models')

const listCategory = async (req, res) => {
    const { limit = 5, from = 0 } = req.query
    const [ total, categories ] = await Promise.all([
        Category.countDocuments({ status: true }),
        Category.find({ status: true })
            .populate('userID', 'name')
            .skip(Number( from ))
            .limit(Number( limit ))
    ])
    res.send({
        total,
        categories
    })
}

const updateCategory = async (req, res) => {
    const { id } = req.params
    const { status,user,...bodyCategory } = req.body

    bodyCategory.name = bodyCategory.name.toUpperCase()
    bodyCategory.userID = req.user._id

    const category = await Category.findByIdAndUpdate(id, bodyCategory, {new: true})
    res.send(user)
}

const upsertCategory = async (req, res) => {    

    const name = req.body.name.toUpperCase()

    const categoryAlreadyExist = await Category.findOne( {name} )

    if (!categoryAlreadyExist) {
        return res.status(400).json({
            msg: 'Category already exists on DB'
        })
    }

    const data = {
        name,
        userID: req.user._id
    }

    const category = new Category( data )
    
    // SAVE ON DB
    await category.save()

    // RESPONSE
    res.send(category)
}

const getCategory = async (req, res) => {
    const { id } = req.params
    const category = await Category.findById( id )
    res.send(category)
}

const deleteCategory = async (req, res) => {
    const { id } = req.params

    // THE BEST WAY TO DELETE USERS
    const category = await Category.findByIdAndUpdate( id, {status: false}, {new: true})
    const userAuth = req.user
    res.json({
        category,
        userAuth
    })
}

module.exports = {
    listCategory,
    updateCategory,
    upsertCategory,
    getCategory,
    deleteCategory
}