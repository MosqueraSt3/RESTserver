'use strict'

const listUser = (req, res) => {
    res.send('Hello World Controller')
}

const upsertUser = (req, res) => {
    res.send(req.body)
}

const getUser = (req, res) => {
    res.send(req.params.id)
}

const deleteUser = (req, res) => {
    res.send(req.params.id)
}

module.exports = {
    listUser,
    upsertUser,
    getUser,
    deleteUser
}